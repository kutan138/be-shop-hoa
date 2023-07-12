import { User } from 'src/modules/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column('simple-array')
  public paragraphs: string[];

  @Column({ nullable: true })
  public content: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}

export default Post;
