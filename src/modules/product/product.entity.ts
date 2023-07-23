import { Image } from "src/modules/image/image.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrderItem from "../order/entities/order-item.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Image, (image) => image.product)
  images: string[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
