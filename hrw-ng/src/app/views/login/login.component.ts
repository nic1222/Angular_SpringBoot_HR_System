import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formStatus: string = '';
  username: string = '';
  password: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.formStatus = "invalid";
    } else {
      this.formStatus = "valid";
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.tokenStorage.saveToken(response.accessToken);
          this.tokenStorage.saveUser(response);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
          // this.router.navigate(["/dashboard"]);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.message;
          this.isLoginFailed = true;
        }
      )
    }
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
