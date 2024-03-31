import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, AlbumModule, ArtistModule],
  controllers: [AppController, UserController, AlbumController, ArtistController],
  providers: [AppService],
})
export class AppModule {}