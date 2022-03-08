import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { MENU_ITEMS } from './views/layouts/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hrw-ng';
  menu = MENU_ITEMS;
  isLoggedIn = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
    private  router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.router.navigate(["/dashboard"]);
    }
  }
}
