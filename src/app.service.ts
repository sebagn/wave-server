import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import config from './config';

@Injectable()
export class AppService {
  constructor() {} // @Inject(config.KEY) private configService: ConfigType<typeof config>,

  getHello() {
    return 'Hello World!';
  }
}
