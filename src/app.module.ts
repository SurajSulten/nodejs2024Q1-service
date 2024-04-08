import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';
import { FavsController } from './favs/favs.controller';
import { FavsModule } from './favs/favs.module';
import { db } from './db';

@Module({
  imports: [UserModule, AlbumModule, ArtistModule, TrackModule, FavsModule],
  controllers: [AppController, UserController, AlbumController, ArtistController, TrackController, FavsController],
  providers: [AppService, {
    provide: 'DB_CONNECTION',
    useValue: db,
},],
})
export class AppModule {}