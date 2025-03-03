import { Component, inject, signal } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './search.component.html',
  styles: ``
})
export default class SearchComponent {

  gifServices = inject(GifsService);

  gifSearchList = signal<Gif[]>([]);


  onSearch(searchTerm: string){
    this.gifServices.getSearchGifs(searchTerm).subscribe(
      res =>
      {
        this.gifSearchList.set(res);
      }
    )
  }

}
