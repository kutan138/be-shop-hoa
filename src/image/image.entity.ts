import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";
import Category from "../category/entities/category.entity";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  name: string;

  @Column()
  public url: string;

  @ManyToOne(() => Product, (product) => product.images)
  public product: Product;

  @ManyToOne(() => Category, (category) => category.images)
  public category: Category;
}
