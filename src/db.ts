import { Album, Artist, Favorites, Track, User } from "./types/interfaces";
export class DB {
            albums: Album[] = []
            users: User[] = []
            tracks: Track[] = []
            favs: Favorites = {
                artists: [],
                albums: [],
                tracks: []
            }
            artists: Artist[] =[]
}
export const db = new DB()
export type DBType = {
    albums: Album[],
    users: User[],
    tracks: Track[],
    favs: Favorites,
    artists: Artist[]
}