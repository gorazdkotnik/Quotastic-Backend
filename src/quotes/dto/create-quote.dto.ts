import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user_id: number;
}
