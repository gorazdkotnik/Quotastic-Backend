import { IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(8, 50)
  @ApiProperty({
    description: 'Current password',
    minLength: 8,
    maxLength: 50,
    example: 'P@ssw0rd',
  })
  currentPassword: string;

  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  })
  @ApiProperty({
    description: 'New password',
    minLength: 8,
    maxLength: 50,
    example: 'P@ssw0rdN3w',
  })
  newPassword: string;
}
