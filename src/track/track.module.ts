import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { db } from 'src/db'


@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'DB_CONNECTION',
      useValue: db
    }
  ]
})
export class TrackModule {}
