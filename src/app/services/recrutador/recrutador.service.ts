import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recrutador } from 'src/app/models/recrutador/recrutador.model';


@Injectable({
  providedIn: 'root'
})
export class RecrutadorService {

  constructor(private http: HttpClient) { }

  getRecrutador() {
    return this.http.get<Array<Recrutador>>(environment.api + "recrutador");
  }
}