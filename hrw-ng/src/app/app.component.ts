import { Component } from '@angular/core';
import { MENU_ITEMS } from './views/layouts/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hrw-ng';
  menu = MENU_ITEMS;
}
