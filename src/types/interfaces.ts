export interface User {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
}
export interface Artist {
    id: string;
    name: string;
    grammy: boolean;
}
export interface Album {
    id: string;
    name: string;
    year: number;
    artistId: ArtistId;
}
export interface Track {
    id: string;
    name: string;
    artistId: ArtistId;
    albumId: AlbumId;
    duration: number;
}
export interface Favorites {
    artists: string[];
    albums: string[];
    tracks: string[];
}
export interface FavoritesResponse {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}

export type ArtistId = string | null;
export type AlbumId = string | null;