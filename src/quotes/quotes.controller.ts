import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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

  // get random quote
  @Get('random')
  @UseGuards(AuthGuard())
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getQuoteById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.getQuoteById(id, user);
  }

  @Post('/:id/upvote')
  @UseGuards(AuthGuard())
  upvoteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.upvoteQuote(id, user);
  }

  @Post('/:id/downvote')
  @UseGuards(AuthGuard())
  downvoteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.downvoteQuote(id, user);
  }
}
