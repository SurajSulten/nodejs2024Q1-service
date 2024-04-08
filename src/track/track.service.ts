import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db';
import { validateIdFormat } from 'src/helpers/validateIdFormat';
import { Track } from 'src/types/interfaces';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { isIdValid } from 'src/helpers/isIdValid';
import { getEntityById } from 'src/helpers/getEntityById';
import { addEntityToCollection } from 'src/helpers/addEntityToCollection';
import { deleteEntityFromCollection } from 'src/helpers/deleteEntityFromCollection';
import { updateEntityInCollection } from 'src/helpers/updateEntityInCollection';
import { deleteIdFromFavs } from 'src/helpers/deleteIdFromFavs';

@Injectable()
export class TrackService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}

    private isInvalidDto(dto: CreateTrackDto | UpdateTrackDto) {
        return !dto.name || !isIdValid(dto.albumId) || !isIdValid(dto.artistId);
    }

    async getTracks() {
        return this.db.tracks;
    }

    async getTrackById(id: string) {
        return getEntityById<Track>(id, this.db.tracks);
    }

    async createTrack(createTrackDto: CreateTrackDto) {
        if(this.isInvalidDto(createTrackDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            )
        } else {
            return addEntityToCollection(createTrackDto, this.db.tracks);
        }
    }

    async deleteTrack(id: string) {
        deleteEntityFromCollection(id, this.db.tracks);
        deleteIdFromFavs(id, this.db.favs.tracks);
    }

    async updateTrack(updateTrackDto: UpdateTrackDto, id: string) {
        if(this.isInvalidDto(updateTrackDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            );
        }
        validateIdFormat(id);
        const updatedTrack = updateEntityInCollection<Track>(
            id,
            updateTrackDto,
            this.db.tracks,
        );
        return updatedTrack;
    }
}


