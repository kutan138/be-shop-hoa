import { IsNotEmpty, IsString } from 'class-validator';

export default class updateProductDto {
  @IsString()
  @IsNotEmpty()
  url: string[];

  @IsString()
  @IsNotEmpty()
  name: string;
}
