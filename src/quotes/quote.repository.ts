import { EntityRepository, Repository } from 'typeorm';
import { Quote } from './quote.entity';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {}
