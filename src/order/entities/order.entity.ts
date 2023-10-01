import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/user.entity";
import { PaymentStatus } from "src/common/enums/payment-status.enum";
import OrderItem from "./order-item.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  customerId: number;

  @Column({ type: "numeric" })
  totalAmount: number;

  @Column({
    name: "payment_status",
    type: "varchar",
    default: PaymentStatus.Created,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: "now()",
    readonly: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: "now()",
  })
  updatedAt: string;

  @ManyToOne(() => User, (customer) => customer.orders)
  @JoinColumn({ name: "customerId", referencedColumnName: "id" })
  customer: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}

export default Order;
