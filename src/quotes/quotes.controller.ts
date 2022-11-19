import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpCode,
  Delete,
  Patch,
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

  @Get('/:id')
  getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.getQuoteById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.createQuote(createQuoteDto);
  }

  @Patch('/:id')
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuoteDto: CreateQuoteDto,
  ) {
    return this.quotesService.updateQuote(id, createQuoteDto.content);
  }

  @Delete('/:id')
  deleteQuote(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.deleteQuote(id);
  }
}
