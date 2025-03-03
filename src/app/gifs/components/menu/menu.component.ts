import { Component } from '@angular/core';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';

@Component({
  selector: 'gifs-menu',
  standalone: true,
  imports: [
    MenuHeaderComponent,
    MenuItemsComponent
  ],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

 
}
