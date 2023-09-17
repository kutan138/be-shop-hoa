import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateCategoryDto from "./dto/createCategoryDto";
import Category from "./entities/category.entity";
import updateCategoryDto from "./dto/updateCategoryDto";
import CategoryNotFoundException from "./exceptions/NotFound.exception";
import { Level } from "src/common/utilities/paginationParams";
import { buildTree } from "src/common/utilities/buildTreeData";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategories({
    offset,
    limit,
    startId,
    level,
  }: {
    offset?: number;
    limit?: number;
    startId?: number;
    level?: number;
  }) {
    // Get all categories tree
    if (Number(level) === Level.GET_ALL) {
      const categories = await this.categoryRepository
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.parent", "parent")
        .select(["category", "parent"])
        .getMany();
      const categoriesConverted = categories.map((category) => {
        return { ...category, parent: category?.parent?.id ?? null };
      });

      return {
        items: buildTree({
          data: categoriesConverted,
          idKey: "id",
          parentKey: "parent",
          parentValue: null,
        }),
      };
    }

    // Get paging category
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
    const { name, images, description, parent } = createCategoryDto;
    const category = this.categoryRepository.create({
      name,
      images,
      description,
    });

    if (parent) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parent },
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

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    if (updateCategoryDto.parent) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: updateCategoryDto.parent },
      });

      category.parent = parentCategory;
    }
    Object.assign(category, updateCategoryDto);

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
