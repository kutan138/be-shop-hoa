import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { DatabaseModule } from "./database/database.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { CloudinaryModule } from "./modules/cloudinary/cloudinary.module";
import { ImageModule } from "./modules/image/image.module";
import { OrderModule } from "./modules/order/order.module";
import { ProductModule } from "./modules/product/product.module";
import { UserModule } from "./modules/user/user.module";
import { CategoryModule } from "./modules/category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    CloudinaryModule,
    AuthenticationModule,
    ProductModule,
    OrderModule,
    ImageModule,
    CategoryModule,
  ],
})
export class AppModule {}
