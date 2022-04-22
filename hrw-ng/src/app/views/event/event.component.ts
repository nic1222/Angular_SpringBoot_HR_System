import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventList: Event[];

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllLeaves().subscribe(
      (response: Event[]) => {
        this.eventList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteEvent(id: string) {
    this.eventService.deleteEvent(id).subscribe(
      (response) => {
        this.loadEvents();
        alert("Successfully deleted.");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
