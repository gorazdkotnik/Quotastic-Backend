import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/quote.entity';
import { User } from 'src/auth/user.entity';
import { Vote } from 'src/votes/vote.entity';

export const typeOrmConfig: () => TypeOrmModuleOptions = () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Quote, User, Vote],
  synchronize: true,
});
