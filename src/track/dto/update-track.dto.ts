import { AlbumId, ArtistId } from 'src/types/interfaces';

export class UpdateTrackDto {
    readonly name: string;
    readonly artistId: ArtistId;
    readonly albumId: AlbumId;
    readonly duration: number;
}