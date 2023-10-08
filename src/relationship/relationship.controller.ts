import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PaginationParams } from "src/common/utilities/paginationParams";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";
import { UpdateRelationshipDto } from "./dto/update-relationship.dto";
import { RelationshipService } from "./relationship.service";

@Controller("relationship")
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  create(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipService.create(createRelationshipDto);
  }

  @Get()
  async findAll(@Query() { offset, limit, startId }: PaginationParams) {
    return this.relationshipService.findWithPagination({
      offset,
      limit,
      startId,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.relationshipService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateDesignDto: UpdateRelationshipDto
  ) {
    return this.relationshipService.update(+id, updateDesignDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.relationshipService.remove(+id);
  }
}
