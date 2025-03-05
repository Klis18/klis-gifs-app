import { Component, inject } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../services/gifs.service';

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

  gifService = inject(GifsService)

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

  getRecentSearchs(){
    const searchs = this.gifService.searchKeys();
    const recentSearchs = searchs.slice(-5);
    return recentSearchs.reverse();
  }

}
