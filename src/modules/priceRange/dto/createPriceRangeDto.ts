import { IsOptional } from "class-validator";
import { Column } from "typeorm";

export default class CreatePriceRangeDto {
  @Column()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  minPrice: number;

  @Column({ nullable: true })
  @IsOptional()
  maxPrice: number;
}
