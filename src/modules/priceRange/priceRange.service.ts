import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PriceRangeEntity } from "./priceRange.entity";
import CreatePriceRangeDto from "./dto/createpriceRangeDto";
import UpdatePriceRangeDto from "./dto/updatePriceRangeDto";

@Injectable()
export class PriceRangeService {
  constructor(
    @InjectRepository(PriceRangeEntity)
    private readonly priceRangeRepository: Repository<PriceRangeEntity>
  ) {}

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
      this.priceRangeRepository.createQueryBuilder("priceRange");
    if (startId) {
      queryBuilder.where("priceRange.id > :startId", { startId });
    }
    const skip = (offset - 1) * limit;

    const [items, count] = await queryBuilder
      .orderBy("priceRange.id", "ASC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async findOne(id: number): Promise<PriceRangeEntity> {
    return await this.priceRangeRepository.findOne({ where: { id } });
  }

  async create(
    createPriceRangeDto: CreatePriceRangeDto
  ): Promise<PriceRangeEntity> {
    return this.priceRangeRepository.save(createPriceRangeDto);
  }

  async update(
    id: number,
    updatePriceRangeDto: UpdatePriceRangeDto
  ): Promise<PriceRangeEntity> {
    const priceRange = await this.findOne(id);

    if (!priceRange) {
      throw new NotFoundException("Price range not found");
    }

    return this.priceRangeRepository.save({
      ...priceRange,
      updatePriceRangeDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.priceRangeRepository.delete(id);
  }
}
