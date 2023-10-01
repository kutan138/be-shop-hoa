import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { DesignService } from "./design.service";
import { CreateDesignDto } from "./dto/create-design.dto";
import { UpdateDesignDto } from "./dto/update-design.dto";
import { PaginationParams } from "src/common/utilities/paginationParams";

@Controller("design")
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post()
  create(@Body() createDesignDto: CreateDesignDto) {
    return this.designService.create(createDesignDto);
  }

  @Get()
  async findAll(@Query() { offset, limit, startId }: PaginationParams) {
    return this.designService.findWithPagination({
      offset,
      limit,
      startId,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.designService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateDesignDto: UpdateDesignDto) {
    return this.designService.update(+id, updateDesignDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.designService.remove(+id);
  }
}
