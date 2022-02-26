import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-qrgenr',
  templateUrl: './qrgenr.component.html',
  styleUrls: ['./qrgenr.component.scss']
})

export class QrgenrComponent implements OnInit {

  qrinfo: string = '';

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.random();
    setInterval(() => { this.random() }, 10000);
  }

  random(): void {
    this.qrinfo = new Date().toLocaleString();
    this.baseService.setQrInfo(this.qrinfo);
  }


}
