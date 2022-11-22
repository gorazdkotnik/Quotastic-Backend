import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @IsNotEmpty()
  @Length(10, 2000, { message: 'Quote must be between 10 and 2000 characters' })
  @IsString()
  @ApiProperty({
    description: 'Quote',
    minLength: 10,
    maxLength: 2000,
    example:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
  })
  content: string;
}
