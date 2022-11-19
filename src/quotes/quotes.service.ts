import { Quote } from 'src/quotes/quote.entity';
import { User } from 'src/auth/user.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote, VoteType } from 'src/votes/vote.entity';
import QuotesSelect from './utils/quotes-select';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,

    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
  ) {}

  async getQuoteById(id: number, user: User | null): Promise<Quote> {
    let quote: Quote;

    if (user) {
      quote = await this.quoteRepository.findOne({
        where: { id, user: user },
      });
    } else {
      quote = await this.quoteRepository.findOne({ where: { id } });
    }

    if (!quote) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }

    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    const quotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.votes', 'vote')
      .select(QuotesSelect)
      .groupBy('quote.id')
      .orderBy('voteScore', 'DESC')
      .getRawMany();

    return quotes;
  }

  async getMostRecentQuotes(): Promise<Quote[]> {
    const quotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.votes', 'vote')
      .select(QuotesSelect)
      .groupBy('quote.id')
      .orderBy('quote.id', 'DESC')
      .getRawMany();

    return quotes;
  }

  async getLikedQuotes(user: User): Promise<Quote[]> {
    const quotes = await this.quoteRepository

      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.votes', 'vote')
      .where('vote.userId = :userId', { userId: user.id })
      .andWhere('vote.vote = 1')
      .select(QuotesSelect)
      .groupBy('quote.id')
      .orderBy('voteScore', 'DESC')
      .getRawMany();

    return quotes;
  }

  async createQuote(
    createQuoteDto: CreateQuoteDto,
    user: User,
  ): Promise<Quote> {
    const { content } = createQuoteDto;

    const quote = this.quoteRepository.create({
      content,
      user,
    });

    await this.quoteRepository.save(quote);
    return quote;
  }

  async deleteQuote(id: number, user: User): Promise<void> {
    const result = await this.quoteRepository.delete({ id, user: user });

    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
  }

  async updateQuote(id: number, content: string, user: User): Promise<Quote> {
    const quote = await this.getQuoteById(id, user);
    quote.content = content;
    await this.quoteRepository.save(quote);
    return quote;
  }

  async voteQuote(id: number, user: User, voteType: VoteType): Promise<Vote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });

    if (!quote) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }

    const vote = await this.voteRepository.findOne({
      where: { user: user, quote: quote },
    });

    if (vote && vote.vote === voteType) {
      throw new ConflictException(`User has already voted this quote`);
    }

    if (vote && vote.vote !== voteType) {
      vote.vote = voteType;
      await this.voteRepository.save(vote);
      return vote;
    }

    const newVote = this.voteRepository.create({
      user: user,
      quote: quote,
      vote: voteType,
    });

    await this.voteRepository.save(newVote);
    return newVote;
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = await this.getAllQuotes();
    const randIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randIndex];
  }
}
