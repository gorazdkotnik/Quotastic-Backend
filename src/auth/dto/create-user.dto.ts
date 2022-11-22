import { IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'First name can only contain letters and spaces',
  })
  @ApiProperty({
    description: 'First name',
    minLength: 2,
    maxLength: 50,
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'lastName can only contain letters and spaces',
  })
  @ApiProperty({
    description: 'Last name',
    minLength: 2,
    maxLength: 50,
    example: 'Doe',
  })
  lastName: string;

  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  })
  @ApiProperty({
    description: 'Password',
    minLength: 8,
    maxLength: 50,
    example: 'P@ssw0rd',
  })
  password: string;
}
