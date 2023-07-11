import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Equipamento } from 'src/app/models/equipamento/equipamento.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) { }

  getEquipamento() {
    return this.http.get<Array<Equipamento>>(environment.api + "equipamento");
  }
}