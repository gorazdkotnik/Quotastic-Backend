import { typeOrmConfig } from './typeorm.config';

export default () => ({
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRATION_TIME,
  db: typeOrmConfig(),
});

export * from './swagger.config';
