import { map } from "rxjs";
import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper{

    static mapGiphyItemToGif(giphyItem: GiphyItem): Gif{

        return {
            id: giphyItem.id,
            title: giphyItem.title,
            image: giphyItem.images.original.url
        }
    };

    static mapGiphyItemsToGifsArray(items: GiphyItem[]):Gif[]{
        return items.map(this.mapGiphyItemToGif);
    }
}