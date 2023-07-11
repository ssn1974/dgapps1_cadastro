import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Memoria } from 'src/app/models/memoria/memoria.model';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  constructor(private http: HttpClient) { }

  getMemoria() {
    return this.http.get<Array<Memoria>>(environment.api + "memoria");
  }
}