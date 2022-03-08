import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { Attendance } from '../models/attendance.model';
import { QR } from '../models/qr.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private baseService: BaseService
  ) { }

  public checkInAtt(att: Attendance): Observable<Attendance> {
    let api = ApiConfig.ATTENDANCE_CHECK_IN;
    return this.baseService.post(api, att);
  }

  public checkOutAtt(att: Attendance): Observable<Attendance> {
    let api = ApiConfig.ATTENDANCE_CHECK_OUT;
    return this.baseService.update(api, att);
  }

  public setQR(qrReq: QR): Observable<QR> {
    let api = ApiConfig.ATTENDANCE_QR_SET;
    return this.baseService.post(api, qrReq);
  }

  public getQR(qr: string): Observable<QR> {
    let api = ApiConfig.ATTENDANCE_QR_GET.replace('${qrInfo}', qr);
    return this.baseService.get(api);
  }
}
