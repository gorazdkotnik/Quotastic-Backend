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
import { Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Throttle } from '@nestjs/throttler';
import { UnsupportedMediaTypeException } from '@nestjs/common/exceptions';

export const storage = {
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new UnsupportedMediaTypeException('Only image files are allowed!'),
        false,
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  @Throttle(5, 60)
  uploadAvatar(@UploadedFile() file, @GetUser() user) {
    return this.usersService.uploadAvatar(file.filename, user);
  }

  @Get('/avatar/:imagename')
  getAvatar(@Param('imagename') imagename, @Res() res) {
    return this.usersService.getAvatar(imagename, res);
  }

  @Delete('/avatar')
  @Throttle(5, 60)
  deleteAvatar(@GetUser() user) {
    return this.usersService.deleteAvatar(user);
  }
}
