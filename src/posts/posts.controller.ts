import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto } from './dto/like-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  get() {
    return this.postsService.get();
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Post(':id/likes')
  likePost(@Body() likePostDto: LikePostDto, @Param() params: { id: string }) {
    const { id } = params;

    return this.postsService.likePost(id, likePostDto);
  }
}
