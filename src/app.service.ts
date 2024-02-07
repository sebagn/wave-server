import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello() {
    const { user, password, host, port, name } = config().database;
    const uri = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`;
    const client = new MongoClient(uri);
    async function run() {
      try {
        await client.connect();
        console.log('Connected to the database');
        const database = client.db('wavedb');
        const odontologosCollection = database.collection('odontologos');
        const odontologos = await odontologosCollection.find().toArray();
        console.log(odontologos);
      } catch (e) {
        console.error(e);
      }
    }
    run();
    return 'Hello World!';
  }
}
