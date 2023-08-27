import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateCategoryDto from "./dto/createCategoryDto";
import Category from "./entities/category.entity";
import updateCategoryDto from "./dto/updateCategoryDto";
import CategoryNotFoundException from "./exceptions/NotFound.exception";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategories(offset?: number, limit?: number, startId?: number) {
    const queryBuilder = this.categoryRepository.createQueryBuilder("category");

    if (startId) {
      queryBuilder.where("category.id > :startId", { startId });
    }
    const skip = (offset - 1) * limit;

    const [items, count] = await queryBuilder
      .orderBy("category.id", "ASC")
      .skip(skip)
      .take(limit)
      .leftJoinAndSelect("category.parent", "parent")
      .getManyAndCount();

    return { items, count };
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    const { name, images, description, parentCategoryId } = createCategoryDto;
    const category = this.categoryRepository.create({
      name,
      images,
      description,
    });

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parentCategoryId },
      });

      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: updateCategoryDto
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    const { name, images, description, parentCategoryId } = updateCategoryDto;

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    if (parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parentCategoryId },
      });

      category.parent = parentCategory;
    }

    if (name) {
      category.name = updateCategoryDto.name;
    }

    if (description) {
      category.description = updateCategoryDto.description;
    }

    if (images) {
      category.images = updateCategoryDto.images;
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategoryWithChildren(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["children"],
    });

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    async function recursivelyDeleteChildren(
      category: Category
    ): Promise<void> {
      for (const child of category.children) {
        await recursivelyDeleteChildren(child);
        await this.categoryRepository.remove(child);
      }
    }
    await recursivelyDeleteChildren(category);

    await this.categoryRepository.remove(category);
  }
}
