import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcao } from 'src/app/models/cargo/funcao.model';
import { environment } from 'src/environments/environment';
import { Contrato } from 'src/app/models/contrato/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }

  getContrato() {
    return this.http.get<Array<Contrato>>(environment.api + "contrato");
  }
}
