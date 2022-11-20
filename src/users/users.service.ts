import { NotFoundException } from '@nestjs/common/exceptions';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcryptjs';
import { unlinkSync, existsSync } from 'fs';
import path = require('path');

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

  async uploadAvatar(
    imagePath: string,
    user: User,
  ): Promise<{ avatar: string }> {
    if (user.avatar) {
      this.deleteAvatar(user);
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      avatar: imagePath,
    });

    return {
      avatar: updatedUser.avatar,
    };
  }

  async getAvatar(imagename: string, res): Promise<any> {
    const imagePath = path.join(
      process.cwd(),
      'uploads/profileimages/' + imagename,
    );

    if (existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }

    throw new NotFoundException('Avatar not found');
  }

  async deleteAvatar(user: User): Promise<{ avatar: string }> {
    try {
      unlinkSync(
        path.join(process.cwd(), 'uploads/profileimages/' + user.avatar),
      );
    } catch (error) {
      throw new NotFoundException('Avatar not found');
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      avatar: null,
    });

    return {
      avatar: updatedUser.avatar,
    };
  }
}
