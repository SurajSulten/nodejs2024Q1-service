import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db'
import { Album, Artist, FavoritesResponse, Track } from 'src/types/interfaces';

@Injectable()
export class FavsService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}

    async getFavs() {
        const favsResponse: FavoritesResponse = {
            artists: [],
            albums: [],
            tracks: []
        };

        Object.entries(this.db.favs).map(([key, value]) => {
            const favorites = value.map((favId: string) => {
                const favorite = this.db[key].find((el: any) => el.id === favId);
                return favorite
            });
            return favsResponse;
        })
    }

    async addTrack(id: string) {
        const track = addIdToFavsColection<Track>(
            id,
            this.db.tracks,
            this.db.favs.tracks
        );
        return track;
    }

    async addAlbum(id: string) {
        const album = addIdToFavsColection<Album>(
            id,
            this.db.albums,
            this.db.favs.albums
        );
        return album;
    }

    async addArtist(id: string) {
        const artist = addIdToFavsColection<Artist>(
            id,
            this.db.artists,
            this.db.favs.artists
        );
        return artist;
    }

    async deleteTrack(id: string) {
        deleteEntityIdFromFavs(id, this.db.favs.tracks);
    }

    async deleteAlbum(id: string) {
        deleteEntityIdFromFavs(id, this.db.favs.albums);
    }

    async deleteArtist(id: string) {
        deleteEntityIdFromFavs(id, this.db.favs.artists);
    }
}
