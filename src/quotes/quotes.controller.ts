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
import { VoteType } from 'src/votes/vote.entity';

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
    return this.quotesService.voteQuote(id, user, VoteType.Upvote);
  }

  @Post('/:id/downvote')
  @UseGuards(AuthGuard())
  downvoteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.voteQuote(id, user, VoteType.Downvote);
  }
}
