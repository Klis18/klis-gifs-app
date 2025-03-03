import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'gifs-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './menu-header.component.html',
  styles: ``
})
export class MenuHeaderComponent {
  env = environment;
}
