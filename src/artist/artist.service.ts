import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db'
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateIdFormat } from 'src/helpers/validateIdFormat';
import { Album, Artist, Track } from 'src/types/interfaces';
import { getEntityById } from 'src/helpers/getEntityById';
import { deleteEntityFromCollection } from 'src/helpers/deleteEntityFromCollection';
import { deleteIdFromFavs } from 'src/helpers/deleteIdFromFavs';
import { replaceIdToNull } from 'src/helpers/replaceIdToNull';
import { updateEntityInCollection } from 'src/helpers/updateEntityInCollection';
import { addEntityToCollection } from 'src/helpers/addEntityToCollection';

@Injectable()
export class ArtistService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}

    private isInvalidDto(dto: CreateArtistDto | UpdateArtistDto) {
        return (
            !Object.keys(dto).includes('grammy') || 
            !dto.name ||
            typeof dto.grammy !== 'boolean' ||
            typeof dto.name !== 'string'
        );
    }

    async getArtists() {
        return this.db.artists;
    }

    async getArtistById(id: string) {
        return getEntityById<Artist>(id, this.db.artists);
    }

    async createArtist(createArtistDto: CreateArtistDto) {
        if(this.isInvalidDto(createArtistDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            )
        } else {
            return addEntityToCollection(createArtistDto, this.db.artists);
        }
    }

    async deleteArtist(id: string) {
        deleteEntityFromCollection(id, this.db.artists);
        deleteIdFromFavs(id, this.db.favs.artists);
        this.db.albums = replaceIdToNull<Album>(id, this.db.albums, 'artistId');
        this.db.tracks = replaceIdToNull<Track>(id, this.db.tracks, 'artistId');
    }

    async updateArtist(updateArtistDto: UpdateArtistDto, id: string) {
        if(this.isInvalidDto(updateArtistDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            ); 
        }
        validateIdFormat(id);
        const updatedArtist = updateEntityInCollection<Artist>(
            id,
            updateArtistDto,
            this.db.artists,
        );
        return updatedArtist;
    }
}



