import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styles: `
  `
})
export default class DashboardComponent {

}
