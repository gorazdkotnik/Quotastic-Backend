import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/quote.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'quotastic',
  entities: [Quote],
  synchronize: true,
};
