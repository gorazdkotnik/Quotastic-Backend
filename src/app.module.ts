import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { QuotesModule } from './quotes/quotes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from 'src/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(config().db),
    QuotesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
