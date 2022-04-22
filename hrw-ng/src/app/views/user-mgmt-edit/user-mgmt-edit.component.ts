import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mgmt-edit',
  templateUrl: './user-mgmt-edit.component.html',
  styleUrls: ['./user-mgmt-edit.component.scss']
})
export class UserMgmtEditComponent implements OnInit {

  isEmployee: boolean = false;
  password: string = '';
  user = new Employee();

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    if (this.isEmployee) {
      this.getUserDetail();
    } else {
      this.user = this.userService.getToEditUser();
    }
  }

  checkUserRole(): void {
    this.tokenService.getUser().roles[0] === "ROLE_EMP" ? this.isEmployee = true : this.isEmployee = false;
  }

  getUserDetail() {
    this.userService.getUser(this.tokenService.getUser().id).subscribe(
      (res: Employee) => {
        console.log(res);
        this.user = res;
      },
      err => {
        alert(err.message);
      }
    )
  }

  onSubmit(): void {
    this.user.password = this.password;
    console.log(this.user);

    this.userService.updateUser(this.user).subscribe(
      res => {
        console.log(res);
        alert("Update Successfully");
        this.router.navigate(["/user-mgmt"]);
      },
      err => {
        alert(err.message);
      }
    )
  }
}
