import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/utils/get-user.decorator';
import { CreateQuoteDto } from 'src/quotes/dto/create-quote.dto';
import { QuotesService } from 'src/quotes/quotes.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('me')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quotesService: QuotesService,
  ) {}

  @Get()
  getMe(@GetUser() user) {
    return user;
  }

  @Post('/myquote')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createQuote(@Body() createQuoteDto: CreateQuoteDto, @GetUser() user) {
    return this.quotesService.createQuote(createQuoteDto, user);
  }

  @Patch('/myquote/:id')
  @UsePipes(ValidationPipe)
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user,
  ) {
    return this.quotesService.updateQuote(id, createQuoteDto.content, user);
  }

  @Delete('/myquote/:id')
  deleteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.deleteQuote(id, user);
  }

  @Patch('/update-password')
  @UsePipes(ValidationPipe)
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user,
  ) {
    return this.usersService.updatePassword(updatePasswordDto, user);
  }
}
