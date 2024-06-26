import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { db } from 'src/db'

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'DB_CONNECTION',
      useValue: db
    }
  ]
})
export class ArtistModule {}
