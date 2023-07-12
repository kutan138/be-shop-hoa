import { IsNotEmpty, IsString } from 'class-validator';

export default class createPostDto {
  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  title: string;
}
