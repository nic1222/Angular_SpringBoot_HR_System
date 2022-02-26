import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  qrinfo: string = 'hi';
  scaninfo: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // getHeaders(): HttpHeaders {
  //   let headers = new HttpHeaders();
  //   let token = this.userInfoService.getStoredToken();
  //   headers = headers.append('Content-Type', 'application/json');
  //   if (token !== null) {
  //     headers = headers.append("Authorization", token);
  //   }
  //   return headers;
  // }

  // get(url: string, urlParams?: HttpParams): Observable<any> {
  //   let me = this;
  //   return this.http.get(url, { headers: this.getHeaders(), params: urlParams }).pipe(catchError(this.handleError));
  // }

  // post(url: string, body: Object): Observable<any> {
  //   let me = this;
  //   return this.http.post(url, JSON.stringify(body), { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  // }

  // put(url: string, body: Object): Observable<any> {
  //   let me = this;
  //   return this.http.put(url, JSON.stringify(body), { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  // }

  // delete(url: string): Observable<any> {
  //   let me = this;
  //   return this.http.delete(url, { headers: this.getHeaders() }).pipe(catchError(this.handleError));
  // }

  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }

  public get(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body);
  }

  public update(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

  public setQrInfo(info: string) {
    this.qrinfo = info;
  }

  public matchQR(info: string): boolean {
    if (info == this.qrinfo) {
      return true;
    } else {
      return false;
    }
  }
}
