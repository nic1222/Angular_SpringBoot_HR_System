import { Component, OnInit } from '@angular/core';
import { QR } from 'src/app/models/qr.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-qrgenr',
  templateUrl: './qrgenr.component.html',
  styleUrls: ['./qrgenr.component.scss']
})

export class QrgenrComponent implements OnInit {

  qr = new QR();
  qrInfo: string = '';

  constructor(
    private attService: AttendanceService
  ) { }

  ngOnInit(): void {
    this.randomQR();
    // setInterval(() => { this.randomQR() }, 10000);
  }

  randomQR(): void {
    this.qrInfo = Math.random().toString();
    this.saveQR(this.qrInfo);
  }

  saveQR(info: string): void {
    this.qr.qrInfo = info;
    this.attService.setQR(this.qr).subscribe({
      next: response => {
        console.log("Successfully Saved QR");
      }, error: e => {
        alert(e.message);
      }
    })
  }

}
