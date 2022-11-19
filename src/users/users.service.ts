import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    user: User,
  ): Promise<User> {
    const { currentPassword, newPassword } = updatePasswordDto;
    const foundUser = await this.userRepository.find({
      select: {
        password: true,
      },
      where: {
        id: user.id,
      },
      take: 1,
    });

    if (
      foundUser.length > 0 &&
      (await bcrypt.compare(currentPassword, foundUser[0].password))
    ) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await this.userRepository.save({
        ...user,
        password: hashedPassword,
      });

      delete updatedUser.password;

      return updatedUser;
    }

    throw new BadRequestException('Current password is incorrect');
  }
}
