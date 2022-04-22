import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddLeaveReq, Leave } from 'src/app/models/leave.model';
import { LeaveService } from 'src/app/services/leave.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-leave-add',
  templateUrl: './leave-add.component.html',
  styleUrls: ['./leave-add.component.scss']
})
export class LeaveAddComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  type: string = "";
  dateFrom: Date;
  dateTo: Date;
  reason: string = "";
  leaveReq = new AddLeaveReq();
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  isValidSubmit: boolean = true;

  constructor(
    private tokenService: TokenStorageService,
    private leaveService: LeaveService,
    private fileService: UploadFileService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formatDate(date: any): string {
    const _date = new Date(date);
    const day = _date.getDate();
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidSubmit = false;
    } else{
      this.isValidSubmit = true;
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentFile = file;
          this.leaveReq.filename = file.name;
          this.fileService.upload(this.currentFile).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                alert(event.body + "ev");
              } else if (event.status && event.status === 200) {
                this.addLeave();
              }
            },
            (err: any) => {
              if (err.error && err.status !== 200) {
                alert(err.error);
              } else if (!err.error && err.status !== 200) {
                alert('Could not upload the file!');
              }
              this.leaveReq.filename = "";
              this.currentFile = undefined;
            });
        }
        this.selectedFiles = undefined;
      } else {
        this.addLeave();
      }
    }

    
  }

  addLeave() {
    this.leaveReq.dateFrom = this.formatDate(this.dateFrom);
    this.leaveReq.dateTo = this.formatDate(this.dateTo);
    this.leaveReq.type = this.type;
    this.leaveReq.leaveReason = this.reason;
    this.leaveReq.userId = this.tokenService.getUser().id;
    console.log(this.leaveReq);

    this.leaveService.addLeave(this.leaveReq).subscribe(
      res => {
        console.log(res);
        if (res == null) {
          alert("Request is rejected. Please check the remaining days of your leave.");
        } else {
          alert("Leave request is submitted successfully.");
          this.router.navigate(["/leave"]);
        }
      },
      err => {
        alert(err.message);
      }
    )
  }

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
  }

  // upload(): void {
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.leaveReq.filename = file.name;
  //       this.fileService.upload(this.currentFile).subscribe(
  //         (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             alert(event.body + "ev");
  //           } else if (event.status && event.status === 200) {
  //             alert("Uploaded Successfully.");
  //           }
  //         },
  //         (err: any) => {
  //           if (err.error && err.status !== 200) {
  //             alert(err.error);
  //             this.currentFile = undefined;
  //             this.leaveReq.filename = "";
  //           } else if (!err.error && err.status !== 200) {
  //             alert('Could not upload the file!');
  //           }
  //           this.currentFile = undefined;
  //         });
  //     }
  //     this.selectedFiles = undefined;
  //   }
  // }

}
