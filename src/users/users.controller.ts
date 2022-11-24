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
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { storage } from './helpers/avatar-storage.multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiResponse({
  status: 429,
  description: 'Too many requests.',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error.',
})
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('me')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quotesService: QuotesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get your own profile' })
  @ApiResponse({ status: 200, description: 'Return your own profile.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getMe(@GetUser() user) {
    return user;
  }

  @Post('/myquote')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a quote' })
  @ApiResponse({ status: 201, description: 'The quote has been created.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  createQuote(@Body() createQuoteDto: CreateQuoteDto, @GetUser() user) {
    return this.quotesService.createQuote(createQuoteDto, user);
  }

  @Patch('/myquote/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update your quote' })
  @ApiResponse({ status: 200, description: 'The quote has been updated.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @ApiResponse({ status: 404, description: 'Quote was not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Quote id',
    required: true,
    example: 1,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  updateQuote(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuoteDto: CreateQuoteDto,
    @GetUser() user,
  ) {
    return this.quotesService.updateQuote(id, createQuoteDto.content, user);
  }

  @Delete('/myquote/:id')
  @ApiOperation({ summary: 'Delete your quote' })
  @ApiResponse({ status: 200, description: 'The quote has been deleted.' })
  @ApiResponse({ status: 404, description: 'Quote was not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Quote id',
    required: true,
    example: 1,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  deleteQuote(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.quotesService.deleteQuote(id, user);
  }

  @Patch('/update-password')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update your password' })
  @ApiResponse({ status: 200, description: 'The password has been updated.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user,
  ) {
    return this.usersService.updatePassword(updatePasswordDto, user);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  @Throttle(5, 60)
  @ApiOperation({ summary: 'Upload profile avatar' })
  @ApiResponse({ status: 200, description: 'The avatar has been uploaded.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @ApiResponse({ status: 415, description: 'Unsupported media type.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  uploadAvatar(@UploadedFile() file, @GetUser() user) {
    return this.usersService.uploadAvatar(file.filename, user);
  }

  @Get('/avatar/:imagename')
  @ApiOperation({ summary: 'Get profile avatar' })
  @ApiResponse({ status: 200, description: 'Return profile avatar.' })
  @ApiResponse({ status: 404, description: 'Avatar was not found.' })
  @ApiParam({
    name: 'imagename',
    type: String,
    description: 'Image name',
    required: true,
    example: 'avatar.png',
  })
  @SkipThrottle()
  getAvatar(@Param('imagename') imagename, @Res() res) {
    return this.usersService.getAvatar(imagename, res);
  }

  @Delete('/avatar')
  @Throttle(5, 60)
  @ApiOperation({ summary: 'Delete profile avatar' })
  @ApiResponse({ status: 200, description: 'The avatar has been deleted.' })
  @ApiResponse({ status: 404, description: 'Avatar was not found.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  deleteAvatar(@GetUser() user) {
    return this.usersService.deleteAvatar(user);
  }
}
