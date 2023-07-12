import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import Post from './post.entity';
import { PostService } from './post.service';
import PostSearchService from './postSearch.service';
import { User } from '../user/user.entity';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), SearchModule],
  controllers: [PostController],
  providers: [PostService, PostSearchService],
})
export class PostModule {}
