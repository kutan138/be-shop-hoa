import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Order from "../order/entities/order.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  avatarId: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToMany(() => Order, (order: Order) => order.customer)
  orders: Order[];
}
