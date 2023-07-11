import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bu } from 'src/app/models/bu/bu.model';

@Injectable({
  providedIn: 'root'
})
export class BuService {

  constructor(private http: HttpClient) { }

  getBu() {
    return this.http.get<Array<Bu>>(environment.api + "bu");
  }
}