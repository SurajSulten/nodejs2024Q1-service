import { AlbumId, ArtistId } from "src/types/interfaces";
import { validateIdFormat } from "./validateIdFormat";

export const isValidId = (id: ArtistId | AlbumId ) => {
    if(id) {
        validateIdFormat(id);
    }
    return typeof id === 'string' || id === null;
}