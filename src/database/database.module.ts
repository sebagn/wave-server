import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, port, password, host, user } = configService.database;
        const uri = `mongodb+srv://${user}:${password}@${dbName}.zicsgzf.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`;
        // const uri = `mongodb://${host}:${port}`;

        return {
          uri,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
