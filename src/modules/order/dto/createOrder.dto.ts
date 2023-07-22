import { IsNotEmpty, IsNumber } from "class-validator";
import OrderItem from "../entities/order-item.entity";
import { ApiHideProperty } from "@nestjs/swagger";

export default class createOrderDto {
  @ApiHideProperty()
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNotEmpty()
  orderItems: OrderItem[];
}
