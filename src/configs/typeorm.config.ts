import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/quote.entity';
import { User } from 'src/auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'quotastic',
  entities: [Quote, User],
  synchronize: true,
};
