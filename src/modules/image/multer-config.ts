import { MulterModuleOptions } from '@nestjs/platform-express';
import { extname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const multerConfig = async (
  configService: ConfigService,
): Promise<MulterModuleOptions> => {
  cloudinary.config({
    cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
  });

  return {
    storage: cloudinaryStorage({
      cloudinary,
      folder: 'uploads',
      allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
      },
    }),
  };
};

const cloudinaryStorage = (options: any) => {
  return {
    _handleFile: (req: any, file: any, callback: any) => {
      options.cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error: any, result: any) => {
          if (error) {
            return callback(error);
          }
          file.url = result.url;
          callback(null, file);
        })
        .end(file.buffer);
    },
  };
};
