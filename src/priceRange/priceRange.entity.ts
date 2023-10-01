// src/occasion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "../product/product.entity";
import { IsOptional } from "class-validator";

@Entity()
export class PriceRangeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  minPrice: number;

  @Column({ nullable: true })
  @IsOptional()
  maxPrice: number;
}
