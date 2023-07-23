import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Order from "../order/entities/order.entity";
import { Roles } from "src/common/enums/roles.enum";

export enum UserRole {
  Admin = Roles.Admin,
  User = Roles.User,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  avatarId: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: Roles,
    array: true, // Indicate that the column stores an array of the Roles enum values
    default: [Roles.User], // Default role is 'user' if not specified during user creation
  })
  roles: UserRole[];

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
