import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { Event } from '../models/event.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
  ) { }

  public getAllLeaves(): Observable<Event[]> {
    let api = ApiConfig.EVENT_ALL;
    return this.baseService.get(api);
  }

  public getEvent(id: string): Observable<Event> {
    let api = ApiConfig.EVENT_GET.replace('${id}', id);
    return this.baseService.get(api);
  }

  public addEvent(event: Event): Observable<Event> {
    let api = ApiConfig.EVENT_ADD;
    return this.baseService.post(api, event);
  }

  public deleteEvent(id: string): Observable<void> {
    let api = ApiConfig.EVENT_DELETE.replace('${id}', id);
    return this.baseService.delete(api);
  }

  public getEventsBetweenDate(startDate: any, endDate: any): Observable<any> {
    let api = ApiConfig.EVENT_GET_BY_DATE;
    const params = new HttpParams().set('date1', startDate).set('date2', endDate);
    return this.http.get<Event[]>(api, { params: params });
  }
}
