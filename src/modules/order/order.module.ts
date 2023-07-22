import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import Post from "./entities/order.entity";
import { OrderService } from "./order.service";
import { User } from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class PostModule {}
