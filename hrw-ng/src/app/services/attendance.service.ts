import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { Attendance, ClockInOutReq } from '../models/attendance.model';
import { QR } from '../models/qr.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private baseService: BaseService
  ) { }

  public getAllAtt(): Observable<Attendance[]> {
    let api = ApiConfig.ATTENDANCE_ALL;
    return this.baseService.get(api);
  }

  public getAttByEmp(id: string): Observable<Attendance[]> {
    let api = ApiConfig.ATTENDANCE_GET_EMP.replace('${empId}', id);
    return this.baseService.get(api);
  }

  public deleteAttendance(id: string): Observable<void> {
    let api = ApiConfig.ATTENDANCE_DELETE.replace('${id}', id);
    return this.baseService.delete(api);
  }

  public checkInAtt(req: ClockInOutReq): Observable<any> {
    let api = ApiConfig.ATTENDANCE_CHECK_IN;
    return this.baseService.post(api, req);
  }

  public checkOutAtt(req: ClockInOutReq): Observable<any> {
    let api = ApiConfig.ATTENDANCE_CHECK_OUT;
    return this.baseService.put(api, req);
  }

  public setQR(qrReq: QR): Observable<QR> {
    let api = ApiConfig.ATTENDANCE_QR_SET;
    return this.baseService.post(api, qrReq);
  }

  public getQR(): Observable<QR[]> {
    let api = ApiConfig.ATTENDANCE_QR_GET;
    return this.baseService.get(api);
  }

  public stopQR(): Observable<any> {
    let api = ApiConfig.ATTENDANCE_QR_STOP;
    return this.baseService.delete(api);
  }

  public downloadAttendances(): Observable<any> {
    let api = ApiConfig.ATTENDANCE_DOWNLOAD;
    return this.baseService.getExcel(api);
  }
}
