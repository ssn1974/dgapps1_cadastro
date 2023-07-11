import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Etapa } from 'src/app/models/etapa/etapa.model';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  constructor(private http: HttpClient) { }

  getEtapa() {
    return this.http.get<Array<Etapa>>(environment.api + "etapa");
  }
}