import { Component, OnInit } from '@angular/core';
import { ClockInOutReq } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-qrscan-out',
  templateUrl: './qrscan-out.component.html',
  styleUrls: ['./qrscan-out.component.scss']
})
export class QrscanOutComponent implements OnInit {
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
        console.log("Api get-> " + response[0].qrInfo);
        this.matchQR(this.information, response[0].qrInfo);
      }, error: e => {
        alert(e.error);
        console.log(e.error.message);

      }
    })
  }
  matchQR(scan: string, get: string) {
    if (scan === get) {
      console.log("Matched.");
      this.clockOut();
    } else {
      alert("Not Matched. Please Try Again.");
    }
  }

  clockOut(): void {
    let req = new ClockInOutReq();
    let currentuser = this.tokenService.getUser();
    req.employeeId = currentuser.id;
    this.attService.checkOutAtt(req).subscribe({
      next: response => {
        alert("Clocked out successfully! GoodBye!");
      }, error: e => {
        alert(e.error);
      }
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
