import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db'
import { validateIdFormat } from 'src/helpers/validateIdFormat';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}
    
    private isInvalidDto(dto: CreateAlbumDto | UpdateAlbumDto) {
        return (
            !dto.name || 
            typeof dto.year !== 'number' ||
            typeof dto.name !== 'string' ||
            !isValid(dto.artistId)
        );
    }

    async getAlbums() {
        return this.db.albums;
    }

    async getAlbumById(id: string) {
        return getEntityById<IAlbum>(id, this.db.albums);
    }

    async createAlbum(createAlbumDto: CreateAlbumDto) {
        if(this.isInvalidDto(createAlbumDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            )
        } else {
            return addEntityToCollection(createAlbumDto, this.db.albums);
        }
    }

    async deleteAlbum(id: string) {
        deleteEntityFromCollection(id, this.db.albums);
        
        this.db.tracks = replaceIdToNull<ITrack>(id, this.db.tracks, 'albumId');
        deleteIdFromFavs(id, this.db.favs.albums);
    }

    async updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
        if(this.isInvalidDto(updateAlbumDto)) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is not correct'
            );
        }
        validateIdFormat(id);
        const updatedAlbum = updateEntityInCollection<IAlbum>(
            id,
            updateAlbumDto,
            this.db.albums
        );
        return updatedAlbum;
    }
}
