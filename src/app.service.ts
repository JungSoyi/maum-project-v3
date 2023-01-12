import { Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './common/log/logger';

@Injectable()
export class AppService {
  constructor(private logger: MyLogger) { }

  getHello(): string {
    this.logger.error('level: error');
    this.logger.warn('level: warn');
    this.logger.log('level: log');
    this.logger.verbose('level: verbose');
    this.logger.debug('level: debug');

    return 'Hello World!';
  }

}
