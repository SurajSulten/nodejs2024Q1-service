import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db'

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
}
