import { User } from 'src/auth/user.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async getQuoteById(id: number, user: User): Promise<Quote> {
    // get quotes and user usernames
    const quote = await this.quoteRepository.findOne({
      where: { id, user: user },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }

    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return await this.quoteRepository.find();
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
}
