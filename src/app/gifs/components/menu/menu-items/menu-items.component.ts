import { Component } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'gifs-menu-items',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu-items.component.html',
  styles: ``
})
export class MenuItemsComponent {

  public menuItems: MenuItem[] = [
    {
      icon: 'fa-solid fa-arrow-trend-up',
      itemName: 'Tendencias',
      route: '/dashboard/tendencias'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      itemName: 'Búscador',
      route: '/dashboard/buscador'
    }
  ]

}
