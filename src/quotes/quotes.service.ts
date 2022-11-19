import { CreateQuoteDto } from './dto/create-quote.dto';
import { Injectable } from '@nestjs/common';
import { Quote } from './quote.model';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class QuotesService {
  private quotes: Quote[] = [];

  getAllQuotes(): Quote[] {
    return this.quotes;
  }

  getQuoteById(id: string): Quote {
    const quote = this.quotes.find((quote) => quote.id === id);

    if (!quote) {
      throw new NotFoundException(`Quote with ID "${id}" not found.`);
    }

    return quote;
  }

  createQuote(createQuoteDto: CreateQuoteDto): Quote {
    const { content } = createQuoteDto;

    const quote: Quote = {
      id: uuid(),
      content,
    };

    this.quotes.push(quote);
    return quote;
  }

  updateQuote(id: string, content: string): Quote {
    const found = this.getQuoteById(id);
    found.content = content;
    return found;
  }

  deleteQuote(id: string) {
    const found = this.getQuoteById(id);
    this.quotes = this.quotes.filter((quote) => quote.id !== found.id);
  }
}
