import{ ArtistId } from 'src/types/interfaces'; 

export class CreateAlbumDto {
    readonly name: string;
    readonly year: number;
    readonly artistId: ArtistId;
}