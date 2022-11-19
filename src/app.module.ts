import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig } from './configs/typeorm.config';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), QuotesModule],
})
export class AppModule {}
