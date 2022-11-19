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
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/utils/get-user.decorator';

@Controller('quotes')
@UseGuards(AuthGuard())
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAllQuotes() {
    return this.quotesService.getAllQuotes();
  }

  @Get('/:id')
  getQuoteById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.getQuoteById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createQuote(@Body() createQuoteDto: CreateQuoteDto, @GetUser() user) {
    return this.quotesService.createQuote(createQuoteDto, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user,
  ) {
    return this.quotesService.updateQuote(id, createQuoteDto.content, user);
  }

  @Delete('/:id')
  deleteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.deleteQuote(id, user);
  }
}
