import { IsNotEmpty, Matches, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(8, 50)
  currentPassword: string;

  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  })
  newPassword: string;
}
