import { Component, inject, signal } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifListItemComponent } from "../../components/gif-list/gif-list-item/gif-list-item.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    GifListItemComponent
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export default class SearchComponent {

  gifServices = inject(GifsService);

  gifSearchList = signal<Gif[]>([]);


  onSearch(searchTerm: string){
    console.log('Buscando', searchTerm);
    this.gifServices.getSearchGifs(searchTerm)?.subscribe(
      res =>
      {
        this.gifSearchList.set(res);
      }
    )
  }

}
