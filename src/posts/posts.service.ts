import { Inject, Injectable } from '@nestjs/common';
import { PostsLikes } from 'src/database/entities/posts-likes/posts-likes.entity';
import { Posts } from 'src/database/entities/posts/posts.entity';
import { Users } from 'src/database/entities/users/users.entity';
import { Repositories } from 'src/shared/enums/repositories.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(Repositories.Posts)
    private postsRepository: typeof Posts,
    @Inject(Repositories.Users)
    private usersRepository: typeof Users,
    @Inject(Repositories.PostsLikes)
    private postsLikesRepository: typeof PostsLikes,
  ) {}

  get() {
    return this.postsRepository.findAll({ include: [this.usersRepository] });
  }

  async create(createPostDto: CreatePostDto) {
    const { username } = createPostDto;
    const [user] = await this.usersRepository.findOrCreate({
      where: { username },
      defaults: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const now = new Date();

    return this.postsRepository.create<Posts>({
      userId: user.id,
      lastNotifiedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  }

  async likePost(postId: string, likePostDto: LikePostDto) {
    const { times } = likePostDto;
    const user = await this.usersRepository.findOne();

    await Promise.all(
      Array(times)
        .fill(0)
        .map(() => {
          this.postsLikesRepository.create<PostsLikes>({
            postId,
            userId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }),
    );
  }
}
