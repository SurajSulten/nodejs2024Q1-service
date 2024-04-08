import{ ArtistId } from 'src/types/interfaces'; 

export class UpdateAlbumDto {
    readonly name: string;
    readonly year: number;
    readonly artistId: ArtistId;
}
