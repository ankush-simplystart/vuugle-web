import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpInterceptor,HttpClient, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  position = 'top-right';
  constructor(
    private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type':  'application/json',
      // 'token': '75FC9C20269896C09FB07E47F09AAF864AFC961F3C6FDEFB200F43E3876FA884',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Accept-Language': 'd12cc4046dbc53630c2ba3afcb18640c'
    })
  };

  apiReq(method: string, endPoint: string, payload?: any, options: any = this.httpOptions): Observable<any> {
    var API_URL = endPoint; //environment.s3_public_url;
    switch (method) {
      case 'get':
        return this.httpClient.get(API_URL, payload);
      case 'post':
        return this.httpClient.post(API_URL, payload,options);
      case 'put':
        return this.httpClient.put(API_URL, payload);
      case 'patch':
        return this.httpClient.patch(API_URL, payload);
      case 'delete':
        return this.httpClient.delete(API_URL , payload);
      default:
        return null;
    }
  }

}
