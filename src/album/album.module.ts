import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { db } from 'src/db'

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'DB_CONNECTION',
      useValue: db
    }
  ]
})
export class AlbumModule {}
