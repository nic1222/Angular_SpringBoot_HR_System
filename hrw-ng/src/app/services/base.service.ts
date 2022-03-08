import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient,
  ) { }

  public get(url: string): Observable<any> {
    return this.http.get<any>(url, httpOptions);
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, httpOptions);
  }

  public update(url: string, body: any): Observable<any> {
    return this.http.put(url, body, httpOptions);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url, httpOptions);
  }
}
