import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OccasionController } from "./admin/occasion.controller";
import { Occasion } from "./occasion.entity";
import { OccasionService } from "./occasion.service";

@Module({
  imports: [TypeOrmModule.forFeature([Occasion])],
  controllers: [OccasionController],
  providers: [OccasionService],
})
export class OccasionModule {}
