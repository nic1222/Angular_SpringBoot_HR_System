import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.component.html',
  styleUrls: ['./leave-edit.component.scss']
})
export class LeaveEditComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  toEditLeave = new Leave();
  dateFrom: Date;
  dateTo: Date;

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toEditLeave = this.leaveService.getToEditLeave();
    this.dateFrom = new Date(this.toEditLeave.dateFrom);
    this.dateTo = new Date(this.toEditLeave.dateTo);
  }

  formatDate(date: any): string {
    const _date = new Date(date);
    const day = _date.getDate();
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onSubmit(form: NgForm) {
    console.log(this.toEditLeave);
    this.toEditLeave.dateFrom = this.formatDate(this.dateFrom);
    this.toEditLeave.dateTo = this.formatDate(this.dateTo);
    this.leaveService.updateLeave(this.toEditLeave).subscribe(
      res => {
        alert("Leave is updated successfully");
        this.router.navigate(["/leave"]);
      },
      err => {
        alert(err.message);
      }
    );
  }
}
