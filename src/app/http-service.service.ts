import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  public getMicroondas(): Observable<string> {
    return this.http.get<string>("www.benner.com/apiMicroondas/get");
  }

}
