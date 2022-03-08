import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mgmt-edit',
  templateUrl: './user-mgmt-edit.component.html',
  styleUrls: ['./user-mgmt-edit.component.scss']
})
export class UserMgmtEditComponent implements OnInit {

  password: string = '';
  user = new User();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getToEditUser();
  }

  onSubmit(): void {
    this.user.password = this.password;
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
