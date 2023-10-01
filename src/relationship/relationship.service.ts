import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";
import { UpdateRelationshipDto } from "./dto/update-relationship.dto";
import { Relationship } from "./entities/relationship.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>
  ) {}

  async create(
    createRelationshipDto: CreateRelationshipDto
  ): Promise<Relationship> {
    return this.relationshipRepository.save(createRelationshipDto);
  }

  async findWithPagination({
    offset,
    limit,
    startId,
  }: {
    offset?: number;
    limit?: number;
    startId?: number;
  }) {
    // Get paging
    const queryBuilder =
      this.relationshipRepository.createQueryBuilder("relation");
    if (startId) {
      queryBuilder.where("relation.id > :startId", { startId });
    }
    const skip = (offset - 1) * limit;

    const [items, count] = await queryBuilder
      .orderBy("relation.id", "ASC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async findOne(id: number): Promise<Relationship> {
    return this.relationshipRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateRelationshipDto: UpdateRelationshipDto
  ): Promise<Relationship> {
    const relactionship = await this.findOne(id);

    if (!relactionship) {
      throw new NotFoundException("Relationship not found");
    }

    return this.relationshipRepository.save({
      ...relactionship,
      ...updateRelationshipDto,
    });
  }

  async remove(id: number) {
    return this.relationshipRepository.delete(id);
  }
}
