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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('quotes')
@ApiResponse({
  status: 429,
  description: 'Too many requests.',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error.',
})
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  @ApiResponse({ status: 200, description: 'Return all quotes.' })
  getAllQuotes() {
    return this.quotesService.getAllQuotes();
  }

  @Get('random')
  @ApiOperation({ summary: 'Get a random quote' })
  @ApiResponse({ status: 200, description: 'Return a random quote.' })
  getRandomQuote() {
    return this.quotesService.getRandomQuote();
  }

  @Get('most-recent')
  @ApiOperation({ summary: 'Get the most recent quotes' })
  @ApiResponse({ status: 200, description: 'Return the most recent quotes.' })
  getMostRecentQuotes() {
    return this.quotesService.getMostRecentQuotes();
  }

  @Get('liked-quotes')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get your own liked quotes' })
  @ApiResponse({ status: 200, description: 'Return your own liked quotes.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  getLikedQuotes(@GetUser() user) {
    return this.quotesService.getLikedQuotes(user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a quote by id' })
  @ApiResponse({ status: 200, description: 'Return a quote by id.' })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Quote id',
    required: true,
    example: 1,
  })
  getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.getQuoteById(id, null);
  }

  @Post('/:id/upvote')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Upvote a quote' })
  @ApiResponse({ status: 200, description: 'Upvote a quote.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  @ApiResponse({
    status: 409,
    description: 'You cannot vote on your own quote.',
  })
  @ApiResponse({ status: 409, description: 'You already voted on this quote.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Quote id',
    required: true,
    example: 1,
  })
  @ApiBearerAuth()
  upvoteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.voteQuote(id, user, VoteType.Upvote);
  }

  @Post('/:id/downvote')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Downvote a quote' })
  @ApiResponse({ status: 200, description: 'Downvote a quote.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Quote not found.' })
  @ApiResponse({
    status: 409,
    description: 'You cannot vote on your own quote.',
  })
  @ApiResponse({ status: 409, description: 'You already voted on this quote.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Quote id',
    required: true,
    example: 1,
  })
  @ApiBearerAuth()
  downvoteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.voteQuote(id, user, VoteType.Downvote);
  }
}
