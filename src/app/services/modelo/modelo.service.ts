import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Modelo } from 'src/app/models/modelo/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  getModelo() {
    return this.http.get<Array<Modelo>>(environment.api + "modelo");
  }
}