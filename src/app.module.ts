import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { DatabaseModule } from "./database/database.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { ImageModule } from "./image/image.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { OccasionModule } from "./occasion/occasion.module";
import { PriceRangeModule } from "./priceRange/priceRange.module";
import { DesignModule } from "./design/design.module";
import { RelationshipModule } from "./relationship/relationship.module";

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
    OccasionModule,
    PriceRangeModule,
    DesignModule,
    RelationshipModule,
  ],
})
export class AppModule {}
