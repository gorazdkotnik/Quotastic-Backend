import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
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
  getQuoteById(@Param('id') id: string) {
    return this.quotesService.getQuoteById(id);
  }

  @Post()
  createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.createQuote(createQuoteDto);
  }

  @Patch(':id')
  updateQuote(@Param('id') id: string, @Body('content') content: string) {
    return this.quotesService.updateQuote(id, content);
  }

  @Delete(':id')
  deleteQuote(@Param('id') id: string) {
    return this.quotesService.deleteQuote(id);
  }
}
