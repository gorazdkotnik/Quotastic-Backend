import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 100, { message: 'Email must be between 5 and 100 characters' })
  @ApiProperty({
    description: 'Email address',
    minLength: 5,
    maxLength: 100,
    example: 'johndoe@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty({
    description: 'Password',
    minLength: 8,
    maxLength: 50,
    example: 'P@ssw0rd',
  })
  password: string;
}
