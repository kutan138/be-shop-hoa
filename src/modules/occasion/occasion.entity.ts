// src/occasion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Occasion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Product, (product) => product.occasion)
  products: Product[];
}
