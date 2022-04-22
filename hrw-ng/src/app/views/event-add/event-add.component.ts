import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  title: string = "";
  startDate: Date;
  endDate: Date;
  isValidSubmit: boolean = true;

  constructor(
    private eventService: EventService,
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
    } else {
      this.isValidSubmit = true;
      let addEventReq = new Event();
      addEventReq.title = this.title;
      addEventReq.startDate = this.formatDate(this.startDate);
      addEventReq.endDate = this.formatDate(this.endDate);
      console.log(addEventReq);

      this.eventService.addEvent(addEventReq).subscribe(
        (res) => {
          alert("Event created successfully.");
          this.router.navigate(["/event"]);
        },
        (err: HttpErrorResponse) => {
          console.log(err);

        }
      );
    }

  }
}
