import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { BaseService } from './base.service';
import { Employee } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  toEditUser: Employee;

  constructor(
    private baseService: BaseService
  ) { }

  public setToEditUser(user: Employee): void {
    this.toEditUser = user;
  }

  public getToEditUser(): Employee {
    return this.toEditUser;
  }

  public getUsers(): Observable<Employee[]> {
    let api = ApiConfig.USER_ALL;
    return this.baseService.get(api);
  }

  public getUser(id: string): Observable<Employee> {
    let api = ApiConfig.USER_GET.replace('${id}', id);
    return this.baseService.get(api);
  }

  public addUser(user: Employee): Observable<Employee> {
    let api = ApiConfig.USER_ADD;
    return this.baseService.post(api, user);
  }

  public updateUser(user: Employee): Observable<Employee> {
    let api = ApiConfig.USER_UPDATE;
    return this.baseService.put(api, user);
  }

  public deleteUser(username: string): Observable<void> {
    let api = ApiConfig.USER_DELETE.replace('${id}', username);
    return this.baseService.delete(api);
  }
}
