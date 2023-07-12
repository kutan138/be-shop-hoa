import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import CreatePostDto from './dto/createPost.dto';
import JwtAuthenticationGuard from 'src/modules/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/modules/authentication/requestWithUser.interface';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import PostEntity from './post.entity';
import FindOneParams from 'src/common/utilities/findOneParams';
import updatePostDto from './dto/updatePost.dto';

@Controller('posts')
@ApiTags('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(@Query('search') search: string) {
    if (search) {
      return this.postService.searchForPosts(search);
    }
    return this.postService.getPostsWithAuthors();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'A post has been successfully fetched',
    type: PostEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.',
  })
  getPostById(@Param() { id }: FindOneParams) {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.createPost(post, req.user);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: updatePostDto,
  ) {
    return this.postService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postService.deletePost(Number(id));
  }
}
