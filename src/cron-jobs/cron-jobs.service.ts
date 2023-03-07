import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { PostsLikes } from 'src/database/entities/posts-likes/posts-likes.entity';
import { Posts } from 'src/database/entities/posts/posts.entity';
import { Users } from 'src/database/entities/users/users.entity';
import { Repositories } from 'src/shared/enums/repositories.enum';

@Injectable()
export class CronJobsService {
  constructor(
    @Inject(Repositories.Posts)
    private postsRepository: typeof Posts,
    @Inject(Repositories.PostsLikes)
    private postsLikesRepository: typeof PostsLikes,
  ) {}

  @Cron('*/1 * * * * *')
  async handleLevel1PushNotificationBatchingJob() {
    this.handleJob(1);
  }

  @Cron('*/15 * * * * *')
  async handleLevel2PushNotificationBatchingJob() {
    this.handleJob(2);
  }

  @Cron('*/30 * * * * *')
  async handleLevel3PushNotificationBatchingJob() {
    this.handleJob(3);
  }

  private async handleJob(level: number) {
    const levelOperators = {
      1: 'HAVING COUNT(*) / 60.0 <= 0.1',
      2: 'HAVING COUNT(*) / 60.0 > 0.1 AND COUNT(*) / 60.0 < 1',
      3: 'HAVING COUNT(*) / 60.0 >= 1',
    };

    const timeAt1MintueBefore = new Date();
    timeAt1MintueBefore.setTime(new Date().getTime() - 1000 * 60);

    const postsWithNewLikes = await this.postsRepository.findAll({
      include: {
        model: PostsLikes,
        where: {
          createdAt: { [Op.gte]: { [Op.col]: 'Posts.lastNotifiedAt' } },
        },
        include: [{ model: Users, required: false }],
      },
    });

    const postsWithNewLikesIds = postsWithNewLikes.map(
      (post) => `'${post.id}'`,
    );

    let postsToNotify;

    if (postsWithNewLikesIds.length === 0) {
      postsToNotify = [];
    } else {
      [postsToNotify] = await this.postsLikesRepository.sequelize.query(`
        SELECT "postId"
          FROM public."PostsLikes"
          WHERE "postId" IN (${
            postsWithNewLikesIds.length === 0
              ? `''`
              : postsWithNewLikesIds.join(',')
          })
            AND "createdAt" >= to_timestamp(${
              timeAt1MintueBefore.getTime() / 1000.0
            })
          GROUP BY "postId"
          ${levelOperators[level]}
      `);
    }

    await Promise.all(
      postsToNotify.map(async (post: { postId: string }) => {
        const { postId } = post;

        const postToNotify = postsWithNewLikes.find(
          (postsWithNewLikes) => postsWithNewLikes.id === postId,
        );

        const totalNewLikes = postToNotify.likes.length;
        const aLiker = postToNotify.likes[0].user.username;

        await postToNotify.update({ lastNotifiedAt: Date.now() });

        if (totalNewLikes === 1) {
          console.log(`${aLiker} has liked the post with ID: ${postId}`);
        } else {
          console.log(
            `${aLiker} and ${
              totalNewLikes - 1
            } other people have liked the post with ID: ${postId}`,
          );
        }
      }),
    );
  }
}
