import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/models/status/status.model';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<Array<Status>>(environment.api + "status");
  }
}