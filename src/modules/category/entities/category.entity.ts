import { Image } from "src/modules/image/image.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  slug: string;

  @OneToMany(() => Image, (image) => image.category)
  images: string[];

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: "parentCategoryId" }) // Foreign key column name in the Category table
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}

export default Category;
