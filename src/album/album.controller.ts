import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';


@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    async getAll() {
        return await this.albumService.getAlbums();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.albumService.getAlbumById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createAlbumDto: CreateAlbumDto) {
        return await this.albumService.createAlbum(createAlbumDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        return await this.albumService.deleteAlbum(id);
    }

    @Put(':id')
    async update(
        @Body() updateAlbumDto: UpdateAlbumDto,
        @Param('id') id: string,
    ) {
        return await this.albumService.updateAlbum(updateAlbumDto, id);
    }
}
