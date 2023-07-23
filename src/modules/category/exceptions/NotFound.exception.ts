import { NotFoundException } from "@nestjs/common";
import Category from "../entities/category.entity";
class CategoryNotFoundException extends NotFoundException {
  constructor(id: Category["id"]) {
    super(`Category with id ${id} not found`);
  }
}
export default CategoryNotFoundException;
