import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to home library service! Go to http://localhost:4000/api';
  }
}
