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
  storage: {
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));
