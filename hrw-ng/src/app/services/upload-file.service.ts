import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private baseService: BaseService
  ) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', environment.apiBaseUrl + `/file/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
    return this.baseService.request(req);
  }

  // getFile(filename: string): Observable<any> {
  //   const api = environment.apiBaseUrl + `/file/download/` + filename;
  //   return this.baseService.get(api);
  // }
}
