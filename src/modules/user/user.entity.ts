import { Exclude } from 'class-transformer';
import Post from 'src/modules/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
}
