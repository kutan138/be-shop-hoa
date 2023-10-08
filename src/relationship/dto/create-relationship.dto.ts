import { Relationship } from "../entities/relationship.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateRelationshipDto extends PartialType(Relationship) {}
