import { Module } from "@nestjs/common";
import { RelationshipService } from "./relationship.service";
import { RelationshipController } from "./relationship.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Relationship } from "./entities/relationship.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Relationship])],
  controllers: [RelationshipController],
  providers: [RelationshipService],
})
export class RelationshipModule {}
