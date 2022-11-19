import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAllQuotes() {
    return this.quotesService.getAllQuotes();
  }

  @Get(':id')
  getQuoteById(@Param('id') id: number) {
    return this.quotesService.getQuoteById(id);
  }

  @Post()
  createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.createQuote(createQuoteDto);
  }
}
