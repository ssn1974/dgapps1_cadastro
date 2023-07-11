import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proposta } from 'src/app/models/proposta/proposta.model';
import { HistoricoProposta } from 'src/app/models/historico/historicoProposta/historicoProposta.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(private http: HttpClient) { }

  insereProposta(param: Proposta) {
    return this.http.post(environment.api + "proposta", param, { headers: httpOptions.headers, observe: 'response' });
  }

  getHistoricoProposta(id){
    return this.http.get<HistoricoProposta[]>(environment.api + 'historicoproposta/' + id);
  }

  atualizaProposta(param: Proposta) {
    return this.http.put(environment.api + "proposta/" + param.id, param, { headers: httpOptions.headers, observe: 'response' });
  }

  getPropostaId(id){
    return this.http.get<Proposta>(environment.api + 'propostas/' + id);
  }
}






