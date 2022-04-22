import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { endOfDay, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  excludeDays: number[] = [];
  events$: Observable<Array<CalendarEvent<{ events: Event }>>>;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  fetchEvents(): void {
    const getStart: any = { month: startOfMonth, week: startOfWeek, day: startOfDay }[this.view];
    const getEnd: any = { month: endOfMonth, week: endOfWeek, day: endOfDay }[this.view];
    const date1 = format(getStart(this.viewDate), 'yyyy-MM-dd');
    const date2 = format(getEnd(this.viewDate), 'yyyy-MM-dd');

    this.events$ = this.eventService.getEventsBetweenDate(date1, date2)
      .pipe(
        map((results: any) => {
          return results.map((event: Event) => {
            return {
              title: event.title,
              start: startOfDay(new Date(event.startDate)),
              end: endOfDay(new Date(event.endDate)),
              allDay: true,
              color: event.id === null ? { primary: '#2f79ef' } : { primary: '#e21841' },
              meta: {
                event
              }
            };
          });
        }));
  }

  closeOpenMonthViewDay(viewDate: any) {
    this.activeDayIsOpen = false;
    this.viewDate = viewDate;
    this.fetchEvents();
  }


  // eventClicked(currEvent: CalendarEvent<{ event: Event }>): void {
  //   console.log('Event clicked', currEvent.meta.event);
  //   const clickedEvent = currEvent.meta.event;
  //   if (clickedEvent.eventType === 'leave') {
  //     console.log('This is leave', clickedEvent.eventId);
  //     this._router.navigate();
  //   } else {
  //     console.log('This is an event', clickedEvent.eventId);
  //     this._router.navigate();
  //   }
  // }
}
