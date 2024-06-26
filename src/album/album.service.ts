import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db'
import { v4 as uuidv4 } from 'uuid';
import { validateIdFormat } from 'src/helpers/validateIdFormat';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, Track } from 'src/types/interfaces';
import { getEntityById, } from 'src/helpers/getEntityById';
import { isIdValid } from 'src/helpers/isIdValid';
import { addEntityToCollection } from 'src/helpers/addEntityToCollection';
import { deleteEntityFromCollection } from 'src/helpers/deleteEntityFromCollection';
import { replaceIdToNull } from 'src/helpers/replaceIdToNull';
import { deleteIdFromFavs } from 'src/helpers/deleteIdFromFavs';
import { updateEntityInCollection } from 'src/helpers/updateEntityInCollection';

@Injectable()
export class AlbumService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}
    
    private isInvalidDto(dto: CreateAlbumDto | UpdateAlbumDto) {
        return (
            !dto.name || 
            typeof dto.year !== 'number' ||
            typeof dto.name !== 'string' ||
            !isIdValid(dto.artistId)
        );
    }

    async getAlbums() {
        return this.db.albums;
    }

    async getAlbumById(id: string) {
        return getEntityById<Album>(id, this.db.albums);
    }

    async createAlbum(createAlbumDto: CreateAlbumDto) {
        if(this.isInvalidDto(createAlbumDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            )
        } else {
            this.db.albums.push({...createAlbumDto, id: uuidv4()})
            return addEntityToCollection(createAlbumDto, this.db.albums);
        }
    }

    async deleteAlbum(id: string) {
        deleteEntityFromCollection(id, this.db.albums);
        
        this.db.tracks = replaceIdToNull<Track>(id, this.db.tracks, 'albumId');
        deleteIdFromFavs(id, this.db.favs.albums);
    }

    async updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
        if(this.isInvalidDto(updateAlbumDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            );
        }
        validateIdFormat(id);
        const updatedAlbum = updateEntityInCollection<Album>(
            id,
            updateAlbumDto,
            this.db.albums
        );
        return updatedAlbum;
    }
}


