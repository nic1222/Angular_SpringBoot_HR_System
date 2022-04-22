import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { AddLeaveReq, DenyLeaveReq, Leave } from '../models/leave.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  toEditLeave: Leave;

  constructor(
    private baseService: BaseService
  ) { }

  public getToEditLeave(): Leave {
    return this.toEditLeave;
  }

  public setToEditLeave(leave: Leave): void {
    this.toEditLeave = leave;
  }

  public getAllLeaves(): Observable<Leave[]> {
    let api = ApiConfig.LEAVE_ALL;
    return this.baseService.get(api);
  }

  public getLeavesByEmp(id: string): Observable<Leave[]> {
    let api = ApiConfig.LEAVE_GET_BY_EMP.replace('${empId}', id);
    return this.baseService.get(api);
  }

  public getLeave(id: string): Observable<Leave> {
    let api = ApiConfig.LEAVE_GET.replace('${id}', id);
    return this.baseService.get(api);
  }

  public addLeave(leave: AddLeaveReq): Observable<Leave> {
    let api = ApiConfig.LEAVE_ADD;
    return this.baseService.post(api, leave);
  }

  public updateLeave(leave: Leave): Observable<Leave> {
    let api = ApiConfig.LEAVE_UPDATE;
    return this.baseService.put(api, leave);
  }

  public deleteLeave(id: string): Observable<void> {
    let api = ApiConfig.LEAVE_DELETE.replace('${id}', id);
    return this.baseService.delete(api);
  }

  public approveLeave(id: string): Observable<Leave> {
    let api = ApiConfig.LEAVE_APPROVE.replace('${id}', id);
    return this.baseService.put(api, null);
  }

  public denyLeave(req: DenyLeaveReq): Observable<Leave> {
    let api = ApiConfig.LEAVE_DENY;
    return this.baseService.put(api, req);
  }
}
