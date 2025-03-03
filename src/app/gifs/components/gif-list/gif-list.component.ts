import { Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

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

  images = input.required<Gif[]>();
}
