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

  async getQuoteById(id: number): Promise<Quote> {
    const found = await this.quoteRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }

    return found;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return await this.quoteRepository.find();
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { content } = createQuoteDto;

    const quote = this.quoteRepository.create({
      content,
    });

    await this.quoteRepository.save(quote);
    return quote;
  }

  async deleteQuote(id: number): Promise<void> {
    const result = await this.quoteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
  }

  async updateQuote(id: number, content: string): Promise<Quote> {
    const quote = await this.getQuoteById(id);
    quote.content = content;
    await this.quoteRepository.save(quote);
    return quote;
  }
}
