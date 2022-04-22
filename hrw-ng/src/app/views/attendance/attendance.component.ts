import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attList: Attendance[];
  searchString: string = "";
  isEmployee: boolean = false;
  constructor(
    private tokenService: TokenStorageService,
    private attService: AttendanceService
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.getAttendance();
  }

  getAttendance(): void {
    this.isEmployee ? this.loadMyAttendance() : this.loadAttendance();
  }

  checkUserRole(): void {
    this.tokenService.getUser().roles[0] === "ROLE_EMP" ? this.isEmployee = true : this.isEmployee = false;
  }

  loadMyAttendance(): void {
    this.attService.getAttByEmp(this.tokenService.getUser().id).subscribe(
      (response: Attendance[]) => {
        this.attList = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  loadAttendance(): void {
    this.attService.getAllAtt().subscribe(
      (response: Attendance[]) => {
        this.attList = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteAtt(id: string) {
    this.attService.deleteAttendance(id).subscribe(
      (response) => {
        this.loadAttendance();
        alert("Successfully deleted.");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  downloadAttExcel() {
    this.attService.downloadAttendances().subscribe(
      (response) => {
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
