import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";

@Controller("category")
@ApiTags("category")
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategories();
  }
}
