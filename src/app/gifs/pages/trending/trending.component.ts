import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './trending.component.html',
  styles: ``
})
export default class TrendingComponent {

  gifService = inject(GifsService);

}
