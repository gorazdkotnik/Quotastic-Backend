import { Repository } from 'typeorm';
import { Quote } from '../quote.entity';

export default function (quoteRepository: Repository<Quote>, where: any) {
  const quotesSelect = [
    'quote.id',
    'quote.content',
    'quote.userId',
    "CAST(coalesce(SUM(vote.vote), '0') AS integer) AS voteScore",
    'ARRAY_AGG(DISTINCT CASE WHEN vote.vote = 1 THEN vote.userId END) AS upvoters',
    'ARRAY_AGG(DISTINCT CASE WHEN vote.vote = -1 THEN vote.userId END) AS downvoters',
  ];

  return quoteRepository
    .createQueryBuilder('quote')
    .leftJoinAndSelect('quote.votes', 'vote')
    .where(where)
    .select(quotesSelect)
    .groupBy('quote.id');
}
