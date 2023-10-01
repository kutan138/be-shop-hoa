import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Image } from "src/image/image.entity";

export default class updateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5) // Set the maximum number of images allowed (you can adjust this number)
  images: string[]; // An array to hold the image file paths or URLs

  @IsOptional()
  @IsNumber()
  parent: number;
}
