// src/occasion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "../product/product.entity";
import { IsOptional } from "class-validator";

@Entity()
export class Occasion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  description: string;

  @OneToMany(() => Product, (product) => product.occasion)
  products: Product[];
}
