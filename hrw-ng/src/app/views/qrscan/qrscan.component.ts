import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
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

  getQRInfo(qr: string) {
    this.attService.getQR(qr).subscribe({
      next: response => {
        console.log("Api get-> " + response.qrInfo);
        this.matchQR(this.information, response.qrInfo);
      }, error: e => {
        alert(e.error);
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
    let att = new Attendance();
    let currentuser = this.tokenService.getUser();
    console.log(currentuser.username);
    att.empId = currentuser.username;
    this.attService.checkInAtt(att).subscribe({
      next: response => {
        alert("Attendance successfully taken.");
      }, error: e => {
        alert(e.error);
      }
    })
  }

  scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = $event;
    this.getQRInfo(this.information);
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

}
