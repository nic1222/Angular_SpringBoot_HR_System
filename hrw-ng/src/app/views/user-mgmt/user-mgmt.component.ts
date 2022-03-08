import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss']
})
export class UserMgmtComponent implements OnInit {

  userList: User[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.userList = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  editUser(username: string): void {
    for (let user of this.userList) {
      if (user.username === username) {
        this.userService.setToEditUser(user);
        console.log(user);
        break;
      }
    }
    this.router.navigate(["/user-mgmt-edit"]);
  }

  deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe(
      response => {
        alert("Successfully deleted.");
        this.loadUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
