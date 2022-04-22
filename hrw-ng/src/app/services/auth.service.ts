import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpReq } from '../models/signupReq.model';
import { ApiConfig } from 'src/environments/api-config';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(ApiConfig.LOGIN, {
      username,
      password
    }, httpOptions);
  }

  register(body: SignUpReq): Observable<any> {
    return this.http.post(ApiConfig.REGISTER, body, httpOptions);
  }
}
