import { IsNotEmpty, IsString } from 'class-validator';

export default class createProductDto {
  @IsString()
  @IsNotEmpty()
  url: string[];

  @IsString()
  @IsNotEmpty()
  name: string;
}
