import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { QuotesModule } from './../quotes/quotes.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/auth/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AuthModule, QuotesModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
