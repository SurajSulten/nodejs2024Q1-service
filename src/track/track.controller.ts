import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) {}

    @Get()
    async getAll() {
        return await this.trackService.getTracks();
    }

    @Get(':id')
    async getByID(@Param('id') id: string) {
        return await this.trackService.getTrackById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTrackDto: CreateTrackDto) {
        return await this.trackService.createTrack(createTrackDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) 
    async delete(@Param('id') id: string) {
        return await this.trackService.deleteTrack(id);
    }

    @Put(':id')
    async update(
        @Body() updateTrackDto: UpdateTrackDto,
        @Param('id') id: string,
    ) {
        return await this.trackService.updateTrack(updateTrackDto, id);
    }
}
