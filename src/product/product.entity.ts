import { Image } from "src/image/image.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import OrderItem from "../order/entities/order-item.entity";
import { Occasion } from "../occasion/occasion.entity";

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

  @ManyToOne(() => Occasion, (occasion) => occasion.products)
  occasion: Occasion;
}
