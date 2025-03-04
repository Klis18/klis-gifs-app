import { Component, inject, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-list',
  standalone: true,
  imports: [
    GifListItemComponent
  ],
  templateUrl: './gif-list.component.html',
  styles: ``
})
export class GifListComponent {

  gifService = inject(GifsService);
  
  images = input.required<Gif[]>();
}
