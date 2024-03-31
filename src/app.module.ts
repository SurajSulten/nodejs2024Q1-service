import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, AlbumModule],
  controllers: [AppController, UserController, AlbumController],
  providers: [AppService],
})
export class AppModule {}