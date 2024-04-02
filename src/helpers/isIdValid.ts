import { AlbumId, ArtistId } from "src/types/interfaces";
import { validateIdFormat } from "./validateIdFormat";

export const isIdValid = (id: ArtistId | AlbumId ) => {
    if(id) {
        validateIdFormat(id);
    }
    return typeof id === 'string' || id === null;
}