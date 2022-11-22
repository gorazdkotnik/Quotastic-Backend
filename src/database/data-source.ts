import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config();

// export const dataSourceOptions: () => DataSourceOptions = () => ({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'root',
//   database: 'quotastic',
//   entities: ['dist/**/*.entity.js'],
//   migrations: ['dist/database/migrations/*.js'],
// });

export const dataSourceOptions: () => DataSourceOptions = () =>
  typeOrmConfig() as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions());
export default dataSource;
