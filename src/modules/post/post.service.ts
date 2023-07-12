import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/user/user.entity";
import { In, Repository } from "typeorm";
import CreatePostDto from "./dto/createPost.dto";
import updatePostDto from "./dto/updatePost.dto";
import PostNotFoundException from "./exceptions/PostNotFound.exception";
import Post from "./post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getPostsWithAuthors(offset?: number, limit?: number, startId?: number) {
    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author");

    if (startId) {
      queryBuilder.where("post.id > :startId", { startId });
    }

    const [items, count] = await queryBuilder
      .orderBy("post.id", "ASC")
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async getPostById(id: number) {
    const post = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .where("post.id = :id", { id })
      .getOne();

    if (post) {
      return post;
    }

    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const author = await this.userRepository
      .createQueryBuilder("author")
      .select(["author.id", "author.fullName", "author.phoneNumber"])
      .where("author.id = :id", { id: user.id })
      .getOne();

    const newPost = this.postRepository.create({
      ...post,
      author,
    });

    return this.postRepository.save(newPost);
  }

  async updatePost(id: number, post: updatePostDto) {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOne({ where: { id } });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
