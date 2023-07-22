import { Product } from "src/modules/product/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order from "./order.entity";

@Entity()
class OrderItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column({ type: "numeric" })
  unitPrice: number;

  @Column({ type: "numeric" })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order: Order;
}

export default OrderItem;
