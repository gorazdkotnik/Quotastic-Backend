import { IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 100, { message: 'Email must be between 5 and 100 characters' })
  email: string;

  @IsNotEmpty()
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'First name can only contain letters and spaces',
  })
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'lastName can only contain letters and spaces',
  })
  lastName: string;

  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  })
  password: string;
}
