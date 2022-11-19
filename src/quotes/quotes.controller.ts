import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/utils/get-user.decorator';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAllQuotes() {
    return this.quotesService.getAllQuotes();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getQuoteById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.getQuoteById(id, user);
  }
}
