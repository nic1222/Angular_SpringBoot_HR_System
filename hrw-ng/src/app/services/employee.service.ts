import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { BaseService } from './base.service';
import { ApiConfig } from 'src/environments/api-config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) { }

  public getEmployees(): Observable<Employee[]> {
    let api = ApiConfig.EMPLOYEE_ALL;
    return this.baseService.get(api);
  }

  public getEmployee(employee: Employee): Observable<Employee[]> {
    let api = ApiConfig.EMPLOYEE_GET.replace('{id}', employee.id);
    return this.baseService.get(api);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    let api = ApiConfig.EMPLOYEE_ADD;
    return this.baseService.post(api, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    let api = ApiConfig.EMPLOYEE_UPDATE;
    return this.baseService.post(api, employee);
  }

  public deleteEmployee(employee: Employee): Observable<void> {
    let api = ApiConfig.EMPLOYEE_DELETE.replace('${id}', employee.id);
    return this.baseService.delete(api);
  }
}
