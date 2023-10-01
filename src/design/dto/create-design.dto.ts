import { Design } from "../entities/design.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateDesignDto extends PartialType(Design) {}
