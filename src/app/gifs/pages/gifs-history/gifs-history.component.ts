import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifsService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { CommonModule } from '@angular/common';
import { GifListItemComponent } from "../../components/gif-list/gif-list-item/gif-list-item.component";

@Component({
  selector: 'gifs-history',
  standalone: true,
  imports: [
    CommonModule,
    GifListItemComponent
],
  templateUrl: './gifs-history.component.html',
  styles: ``
})
export default class GifsHistoryComponent {

  gifService = inject(GifsService);

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
