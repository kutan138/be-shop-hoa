import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { PaginationParams } from "src/common/utilities/paginationParams";

@Controller("category")
@ApiTags("category")
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(@Query() { offset, limit, startId }: PaginationParams) {
    return this.categoryService.getCategories(offset, limit, startId);
  }
}
