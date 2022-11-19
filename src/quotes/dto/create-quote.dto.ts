import { IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @Length(10, 2000, { message: 'Quote must be between 10 and 2000 characters' })
  @IsString()
  content: string;
}
