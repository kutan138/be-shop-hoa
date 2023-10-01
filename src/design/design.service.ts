import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDesignDto } from "./dto/create-design.dto";
import { UpdateDesignDto } from "./dto/update-design.dto";
import { Design } from "./entities/design.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DesignService {
  constructor(
    @InjectRepository(Design)
    private readonly designRepository: Repository<Design>
  ) {}

  async create(createDesignDto: CreateDesignDto): Promise<Design> {
    return this.designRepository.save(createDesignDto);
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
    const queryBuilder = this.designRepository.createQueryBuilder("design");
    if (startId) {
      queryBuilder.where("design.id > :startId", { startId });
    }
    const skip = (offset - 1) * limit;

    const [items, count] = await queryBuilder
      .orderBy("design.id", "ASC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async findOne(id: number): Promise<Design> {
    return this.designRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDesignDto: UpdateDesignDto): Promise<Design> {
    const design = await this.findOne(id);

    if (!design) {
      throw new NotFoundException("Design not found");
    }

    return this.designRepository.save({
      ...design,
      ...updateDesignDto,
    });
  }

  async remove(id: number) {
    return this.designRepository.delete(id);
  }
}
