import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  constructor(
    private sidebarService: NbSidebarService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    let currentUser = this.tokenStorageService.getUser();
    this.username = currentUser.username;
    console.log(this.username);
    
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
