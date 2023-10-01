import { Product } from "src/product/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order from "./order.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity()
class OrderItem {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiHideProperty()
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column({ type: "numeric" })
  unitPrice: number;

  @Column({ type: "numeric" })
  quantity: number;

  @ApiHideProperty()
  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product: Product;

  @ApiHideProperty()
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order: Order;
}

export default OrderItem;
