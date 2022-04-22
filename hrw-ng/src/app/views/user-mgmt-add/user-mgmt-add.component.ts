import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpReq } from 'src/app/models/signupReq.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-mgmt-add',
  templateUrl: './user-mgmt-add.component.html',
  styleUrls: ['./user-mgmt-add.component.scss']
})
export class UserMgmtAddComponent implements OnInit {
  username: string = "";
  password: string = "";
  name: string = "";
  gender: string = "";
  email: string = "";
  phone: string = "";
  ic: string = "";
  address: string = "";
  role: string = "";
  req = new SignUpReq();
  isValidSubmit: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidSubmit = false;
    } else {
      this.isValidSubmit = true;
      this.req.username = this.username;
      this.req.password = this.password;
      this.req.name = this.name;
      this.req.gender = this.gender;
      this.req.email = this.email;
      this.req.phone = this.phone;
      this.req.ic = this.ic;
      this.req.address = this.address;
      this.req.role = this.role;
      this.authService.register(this.req).subscribe(
        res => {
          if (res.message === "New user account created successfully!"){
            alert(res.message);
            this.router.navigate(["/user-mgmt"]);
          }else{
            alert(res.message);
          }
        },
        err => {
          alert(err.error.message);
        }
      );
    }

  }

}
