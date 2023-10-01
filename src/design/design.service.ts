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
    return this.designRepository.create(createDesignDto);
  }

  async findAll(): Promise<Design[]> {
    return this.designRepository.find();
  }

  async findOne(id: number): Promise<Design> {
    return this.designRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDesignDto: UpdateDesignDto): Promise<Design> {
    const priceRange = await this.findOne(id);

    if (!priceRange) {
      throw new NotFoundException("Price range not found");
    }

    return this.designRepository.save({
      ...priceRange,
      updateDesignDto,
    });
  }

  async remove(id: number) {
    return this.designRepository.delete(id);
  }
}
