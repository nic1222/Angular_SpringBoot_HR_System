import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLeaveReq, DenyLeaveReq, Leave } from 'src/app/models/leave.model';
import { LeaveService } from 'src/app/services/leave.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  isEmployee: boolean = false;
  leaveList: Leave[];
  toViewLeave: Leave;
  denyReason: string = "";
  toEditLeave: Leave;
  currentFileUrl: string;

  constructor(
    private tokenService: TokenStorageService,
    private leaveService: LeaveService,
    private modalService: NgbModal,
    private fileService: UploadFileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.getLeaveRequest();
  }

  getLeaveRequest(): void {
    this.isEmployee ? this.loadMyLeave() : this.loadAllEmpLeave();
  }

  checkUserRole(): void {
    this.tokenService.getUser().roles[0] === "ROLE_EMP" ? this.isEmployee = true : this.isEmployee = false;
  }

  loadAllEmpLeave(): void {
    this.leaveService.getAllLeaves().subscribe(
      (response: Leave[]) => {
        this.leaveList = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadMyLeave(): void {
    this.leaveService.getLeavesByEmp(this.tokenService.getUser().id).subscribe(
      (response: Leave[]) => {
        this.leaveList = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  open(content: any, leaveId: string) {
    for (let l of this.leaveList) {
      if (l.id === leaveId) {
        this.toViewLeave = l;
        this.currentFileUrl = this.downloadFileUrl(l.filename);
        break;
      }
    }
    this.modalService.open(content);
  }

  approveLeave(id: string) {
    this.leaveService.approveLeave(id).subscribe(
      (response) => {
        alert("Leave request approved.")
        this.getLeaveRequest();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.modalService.dismissAll();
  }

  denyLeave(id: string) {
    if (this.denyReason) {
      let req = new DenyLeaveReq();
      req.id = id;
      req.deniedReason = this.denyReason;
      this.leaveService.denyLeave(req).subscribe(
        (response) => {
          alert("Leave request denied.")
          this.getLeaveRequest();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.modalService.dismissAll();
    } else {
      alert("Please provide deny reason to procced.")
    }
  }

  toEditLeavePage() {
    this.leaveService.setToEditLeave(this.toViewLeave);
    this.router.navigate(["/leave-edit"]);
    this.modalService.dismissAll();
  }

  deleteLeave(id: string) {
    this.leaveService.deleteLeave(id).subscribe(
      (response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.getLeaveRequest();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  downloadFileUrl(filename: string): string {
    const api = environment.apiBaseUrl + `/file/download/` + filename;
    return api;
  }
}
