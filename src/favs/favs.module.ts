import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';

@Module({
  providers: [FavsService]
})
export class FavsModule {}
