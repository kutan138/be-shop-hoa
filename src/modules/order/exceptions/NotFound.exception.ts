import { NotFoundException } from "@nestjs/common";
import Order from "../entities/order.entity";
class OrderNotFoundException extends NotFoundException {
  constructor(id: Order["id"]) {
    super(`Order with id ${id} not found`);
  }
}
export default OrderNotFoundException;
