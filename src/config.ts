import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    dbName: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
}));
