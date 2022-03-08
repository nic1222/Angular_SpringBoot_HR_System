import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { BaseService } from './base.service';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  toEditUser: User;

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  public setToEditUser(user: User): void {
    this.toEditUser = user;
  }

  public getToEditUser(): User {
    return this.toEditUser;
  }

  public getUsers(): Observable<User[]> {
    let api = ApiConfig.USER_ALL;
    return this.baseService.get(api);
  }

  public getUser(user: User): Observable<User[]> {
    let api = ApiConfig.USER_GET.replace('{id}', String(user.id));
    return this.baseService.get(api);
  }

  public addUser(user: User): Observable<User> {
    let api = ApiConfig.USER_ADD;
    return this.baseService.post(api, user);
  }

  public updateUser(user: User): Observable<User> {
    let api = ApiConfig.USER_UPDATE;
    return this.baseService.update(api, user);
  }

  public deleteUser(username: string): Observable<void> {
    let api = ApiConfig.USER_DELETE.replace('${id}', username);
    return this.baseService.delete(api);
  }
}
