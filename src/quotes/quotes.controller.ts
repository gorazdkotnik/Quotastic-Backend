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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAllQuotes() {
    return this.quotesService.getAllQuotes();
  }

  @Get('random')
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }

  @Get('most-recent')
  getMostRecentQuotes() {
    return this.quotesService.getMostRecentQuotes();
  }

  @Get('liked-quotes')
  @UseGuards(AuthGuard())
  getLikedQuotes(@GetUser() user) {
    return this.quotesService.getLikedQuotes(user);
  }

  @Get('/:id')
  getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.getQuoteById(id, null);
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
