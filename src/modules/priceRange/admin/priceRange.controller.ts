import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import FindOneParams from "src/common/utilities/findOneParams";
import JwtAuthenticationGuard from "../../authentication/jwt-authentication.guard";
import RequestWithUser from "../../authentication/requestWithUser.interface";
import { PriceRangeEntity } from "../priceRange.entity";
import { PriceRangeService } from "../priceRange.service";
import { PaginationParams } from "src/common/utilities/paginationParams";

@Controller("admin/price-range")
export class PriceRangeController {
  constructor(private readonly priceRangeService: PriceRangeService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @Body() priceRangeData: PriceRangeEntity
  ): Promise<PriceRangeEntity> {
    return this.priceRangeService.create(priceRangeData);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  async findAll(@Query() { offset, limit, startId }: PaginationParams) {
    return this.priceRangeService.findWithPagination({
      offset,
      limit,
      startId,
    });
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  getPriceRangeById(
    @Param() { id }: FindOneParams,
    @Req() req: RequestWithUser
  ) {
    return this.priceRangeService.findOne(Number(id));
  }

  @Put(":id")
  @UseGuards(JwtAuthenticationGuard)
  async update(
    @Param("id") id: string,
    @Body() priceRangeData: PriceRangeEntity
  ): Promise<PriceRangeEntity> {
    return this.priceRangeService.update(+id, priceRangeData);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard)
  async remove(@Param("id") id: string): Promise<void> {
    return this.priceRangeService.remove(+id);
  }
}
