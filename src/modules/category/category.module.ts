import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import Category from "./entities/category.entity";
import { AdminCategoryController } from "./admin/category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, AdminCategoryController],
  providers: [CategoryService],
})
export class OrderModule {}
