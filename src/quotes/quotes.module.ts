import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { QuoteRepository } from './quote.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
