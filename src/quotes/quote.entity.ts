import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Vote } from 'src/votes/vote.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.quotes, { eager: true })
  user: User;

  @OneToMany((type) => Vote, (vote) => vote.quote, { eager: true })
  votes: Vote[];
}
