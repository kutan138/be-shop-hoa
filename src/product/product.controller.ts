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
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import CreateProductDto from "./dto/createProductDto";
import JwtAuthenticationGuard from "src/authentication/jwt-authentication.guard";
import { PaginationParams } from "src/common/utilities/paginationParams";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./product.entity";
import FindOneParams from "src/common/utilities/findOneParams";
import updateProductDto from "./dto/updateProductDto";

@Controller("product")
@ApiTags("product")
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  async getProducts(@Query() { offset, limit, startId }: PaginationParams) {
    return this.productService.getProducts(offset, limit, startId);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a post that exists in the database",
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "A post has been successfully fetched",
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: "A post with given id does not exist.",
  })
  getProductById(@Param() { id }: FindOneParams) {
    return this.productService.getProductById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }

  @Patch(":id")
  @UseGuards(JwtAuthenticationGuard)
  async updateProduct(
    @Param() { id }: FindOneParams,
    @Body() product: updateProductDto
  ) {
    return this.productService.updateProduct(Number(id), product);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard)
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.productService.deleteProduct(Number(id));
  }
}
