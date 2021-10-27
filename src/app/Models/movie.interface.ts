import { Actor } from "../list-actors/list-actors.component";
import { Genre } from "../list-genre/list-genre.component";

export interface Movie {
    id: string;
    title: string;
    releaseDate: Date;
    overView: string;
    duration: string;
    image: string;
    creationDate: Date;
    modificationDate: Date;
    //genres: Genre[];
    //actors: Actor[];
  }