import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import Order from "./entities/order.entity";
import { ProductService } from "../product/product.service";
import { Product } from "../product/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [OrderService, ProductService],
})
export class OrderModule {}
