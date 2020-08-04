import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hey you shouldn\'t be here! Go to orders-react.netlify.com';
  }
}
