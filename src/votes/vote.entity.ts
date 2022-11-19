import { Quote } from 'src/quotes/quote.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';

export enum VoteType {
  Upvote = 1,
  Downvote = -1,
}

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vote: VoteType;

  @ManyToOne((type) => User, (user) => user.votes, { eager: true })
  user: User;

  @ManyToOne((type) => Quote, (quote) => quote.votes, { eager: false })
  quote: Quote;
}
