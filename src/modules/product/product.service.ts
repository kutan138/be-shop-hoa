import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import createProductDto from './dto/createProductDto';
import updateProductDto from './dto/updateProductDto';
import PostNotFoundException from './exceptions/NotFound.exception';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(offset?: number, limit?: number, startId?: number) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (startId) {
      queryBuilder.where('product.id > :startId', { startId });
    }

    const [items, count] = await queryBuilder
      .orderBy('product.id', 'ASC')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, count };
  }

  async getProductById(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .getOne();

    if (product) {
      return product;
    }

    throw new PostNotFoundException(id);
  }

  async createProduct(product: createProductDto) {
    const newProduct = this.productRepository.create({
      ...product,
    });

    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, product: updateProductDto) {
    return this.productRepository.update(id, product);
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
