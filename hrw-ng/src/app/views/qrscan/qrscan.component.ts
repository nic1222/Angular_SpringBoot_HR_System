import { Component, OnInit } from '@angular/core';
import { Attendance, ClockInOutReq } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.scss']
})
export class QrscanComponent implements OnInit {

  scannerEnabled: boolean = true;
  information: string = '';
  qrToMatch: string = '';

  constructor(
    private attService: AttendanceService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  getQRInfo() {
    this.attService.getQR().subscribe({
      next: response => {
        this.matchQR(this.information, response[0].qrInfo);
      }, error: e => {
        alert("QR code Not Found.");
      }
    })
  }

  matchQR(scan: string, get: string) {
    if (scan === get) {
      console.log("Matched.");
      this.checkIn();
    } else {
      alert("Not Matched. Please Try Again.");
    }
  }

  checkIn(): void {
    let req = new ClockInOutReq();
    let currentuser = this.tokenService.getUser();
    req.employeeId = currentuser.id;
    console.log(req);

    this.attService.checkInAtt(req).subscribe(
      response => {
        if (response == null) {
          alert("Record Existed. You have clocked in already!");
        } else {
          alert("Clocked in successfully!");
        }
      }, e => {
        alert(e);
      }
    )
  }

  scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = $event;
    this.getQRInfo();
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

}
