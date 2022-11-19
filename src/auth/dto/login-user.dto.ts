import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 100, { message: 'Email must be between 5 and 100 characters' })
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  password: string;
}
