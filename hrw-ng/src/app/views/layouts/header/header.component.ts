import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
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
  isEmployee: boolean = false;

  constructor(
    private sidebarService: NbSidebarService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    let currentUser = this.tokenStorageService.getUser();
    this.username = currentUser.name;
    if (currentUser.roles[0] === "ROLE_EMP") {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }
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
