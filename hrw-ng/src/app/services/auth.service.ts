import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpReq } from '../models/signupReq.model';
import { ApiConfig } from 'src/environments/api-config';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiBaseUrl + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(body: SignUpReq): Observable<any> {
    return this.http.post(AUTH_API + 'signup', body, httpOptions);
  }
}