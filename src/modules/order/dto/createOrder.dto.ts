import { IsInt, IsNotEmpty, Min } from "class-validator";
import OrderItem from "../entities/order-item.entity";

export default class createOrderDto {
  @IsNotEmpty()
  orderItems: OrderItem[];
}
