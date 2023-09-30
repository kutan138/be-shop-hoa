import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceRangeController } from "./admin/priceRange.controller";
import { PriceRangeEntity } from "./priceRange.entity";
import { PriceRangeService } from "./priceRange.service";

@Module({
  imports: [TypeOrmModule.forFeature([PriceRangeEntity])],
  controllers: [PriceRangeController],
  providers: [PriceRangeService],
})
export class PriceRangeModule {}
