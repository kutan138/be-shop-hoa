import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { ApiTags } from "@nestjs/swagger";

@Controller("image")
@ApiTags("image")
export class ImageController {
  // ... Constructor
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("upload")
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Post("uploads")
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FilesInterceptor("file[]", 5))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = await Promise.all(
      files.map(async (file): Promise<string> => {
        const { secure_url } = await this.cloudinaryService.uploadFile(file);
        return secure_url;
      })
    );
    return urls;
  }
}
