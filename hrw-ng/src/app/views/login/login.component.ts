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
  isEmptyField = false;
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
    this.isLoginFailed = false;
    if (form.invalid) {
      this.isEmptyField = true;
      this.errorMessage = "Please enter username and password."
    } else {
      this.isEmptyField = false;
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          this.tokenStorage.saveToken(response.accessToken);
          this.tokenStorage.saveUser(response);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          // this.router.navigate(['/dashboard']);
          this.reloadPage();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          
          this.errorMessage = "Wrong username or password. Please try again.";
          this.isLoginFailed = true;
        }
      )
    }
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
