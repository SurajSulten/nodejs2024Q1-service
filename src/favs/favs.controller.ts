import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
    constructor(private readonly favsService: FavsService) {}

    @Get()
    async getAll() {
        return await this.favsService.getFavs();
    }

    @Post('track/:id')
    @HttpCode(HttpStatus.CREATED)
    async addFavTrack(@Param('id') id: string) {
        return await this.favsService.addTrack(id);
    }

    @Post('album/:id')
    @HttpCode(HttpStatus.CREATED)
    async addFavAlbum(@Param('id') id: string) {
        return await this.favsService.addAlbum(id);
    }

    @Post('artist/:id')
    @HttpCode(HttpStatus.CREATED)
    async addFavArtist(@Param('id') id: string) {
        return await this.favsService.addArtist(id);
    }

    @Delete('track/:id')
    @HttpCode(HttpStatus.CREATED)
    async deleteFavTrack(@Param('id') id: string) {
        return await this.favsService.deleteTrack(id);
    }

    @Delete('album/:id')
    @HttpCode(HttpStatus.CREATED)
    async deleteFavAlbum(@Param('id') id: string) {
        return await this.favsService.deleteAlbum(id);
    }

    @Delete('artist/:id')
    @HttpCode(HttpStatus.CREATED)
    async deleteFavArtist(@Param('id') id: string) {
        return await this.favsService.deleteArtist(id);
    }   
}
