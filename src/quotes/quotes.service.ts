import { CreateQuoteDto } from './dto/create-quote.dto';
import { Injectable } from '@nestjs/common';
import { Quote } from './quote.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuotesService {
  private readonly quotes: Quote[] = [];

  getAllQuotes(): Quote[] {
    return this.quotes;
  }

  getQuoteById(id: number): Quote {
    return this.quotes.find((quote) => quote.id === id);
  }

  createQuote(createQuoteDto: CreateQuoteDto) {
    const { content, user_id } = createQuoteDto;

    const quote: Quote = {
      id: uuid(),
      content,
      user_id,
    };

    this.quotes.push(quote);
    return quote;
  }

  updateQuote(id: number, content: string) {
    const index = this.quotes.findIndex((quote) => quote.id === id);
    this.quotes[index].content = content;
  }

  deleteQuote(id: number) {
    const index = this.quotes.findIndex((quote) => quote.id === id);
    this.quotes.splice(index, 1);
  }
}
