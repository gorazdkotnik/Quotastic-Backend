import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Quote } from '../quotes/quote.entity';
import { Vote } from '../votes/vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @OneToMany((type) => Quote, (quote) => quote.user, { eager: false })
  quotes: Quote[];

  @OneToMany((type) => Vote, (vote) => vote.user, { eager: false })
  votes: Vote[];
}
