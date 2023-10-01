// src/occasions/occasions.controller.ts
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
import { Occasion } from "../occasion.entity";
import { OccasionService } from "../occasion.service";
import { PaginationParams } from "src/common/utilities/paginationParams";

@Controller("admin/occasion")
export class OccasionController {
  constructor(private readonly occasionService: OccasionService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() occasionData: Occasion): Promise<Occasion> {
    return this.occasionService.create(occasionData);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  async getCategories(@Query() { offset, limit, startId }: PaginationParams) {
    return this.occasionService.getOccasions({
      offset,
      limit,
      startId,
    });
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  getOccasionById(@Param() { id }: FindOneParams, @Req() req: RequestWithUser) {
    return this.occasionService.findOne(Number(id));
  }

  @Put(":id")
  @UseGuards(JwtAuthenticationGuard)
  async update(
    @Param("id") id: string,
    @Body() occasionData: Occasion
  ): Promise<Occasion> {
    return this.occasionService.update(+id, occasionData);
  }

  @Delete(":id")
  @UseGuards(JwtAuthenticationGuard)
  async remove(@Param("id") id: string): Promise<void> {
    return this.occasionService.remove(+id);
  }
}
