import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { QrgenrComponent } from '../qrgenr/qrgenr.component';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.scss']
})
export class QrscanComponent implements OnInit {

  scannerEnabled: boolean = true;
  //  transports: Transport[] = [];
  information: string = '';

  constructor(
    private cd: ChangeDetectorRef,
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = $event;
    if (this.baseService.matchQR(this.information)) {
      this.information = 'Matched.';
    } else {
      this.information = 'Not Matched.';
    }
    // const appointment = new Appointment($event);
    // this.logService.logAppointment(appointment).subscribe(
    //   (result: OperationResponse) => {
    //     this.information = $event;
    //     this.transports = result.object;
    //     this.cd.markForCheck();
    //   },
    //   (error: any) => {
    //     this.information = "An error has occurred please try again...";
    //     this.cd.markForCheck();
    //   });
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

}
