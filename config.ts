import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
}));
