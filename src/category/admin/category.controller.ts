import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/authentication/jwt-authentication.guard";
import { CategoryService } from "../category.service";
import createCategoryDto from "../dto/createCategoryDto";
import updateCategoryDto from "../dto/updateCategoryDto";
import { PaginationParams } from "src/common/utilities/paginationParams";

@Controller("admin/category")
@ApiTags("admin/category")
@UseInterceptors(ClassSerializerInterceptor)
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  async getCategories(
    @Query() { offset, limit, startId, level }: PaginationParams
  ) {
    return this.categoryService.getCategories({
      offset,
      limit,
      startId,
      level,
    });
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  @ApiBody({ type: createCategoryDto })
  async createCategory(@Body() createCategoryDto: createCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  @ApiBody({ type: updateCategoryDto })
  async updateCategory(
    @Param("id") id: number,
    @Body(ValidationPipe) updateCategoryDto: updateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: number) {
    return this.categoryService.deleteCategoryWithChildren(id);
  }
}
