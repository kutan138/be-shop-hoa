// src/occasions/occasions.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Occasion } from "./occasion.entity";

@Injectable()
export class OccasionService {
  constructor(
    @InjectRepository(Occasion)
    private readonly occasionRepository: Repository<Occasion>
  ) {}

  async create(occasionData: Occasion): Promise<Occasion> {
    return await this.occasionRepository.save(occasionData);
  }

  async getOccasions({
    offset,
    limit,
    startId,
  }: {
    offset?: number;
    limit?: number;
    startId?: number;
  }) {
    // Get paging
    const queryBuilder = this.occasionRepository.createQueryBuilder("occasion");
    if (startId) {
      queryBuilder.where("occasion.id > :startId", { startId });
    }
    const skip = (offset - 1) * limit;

    const [items, count] = await queryBuilder
      .orderBy("occasion.id", "ASC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async findOne(id: number): Promise<Occasion[]> {
    return await this.occasionRepository.find({ where: { id } });
  }

  async update(id: number, occasionData: Occasion): Promise<Occasion> {
    await this.occasionRepository.update(id, occasionData);
    return await this.occasionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.occasionRepository.delete(id);
  }
}
