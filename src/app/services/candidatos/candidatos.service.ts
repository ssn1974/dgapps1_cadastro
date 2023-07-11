import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidatos } from 'src/app/models/candidato/candidatos.model';
import { HistoricoCandidatos } from 'src/app/models/historico/historicoCandidatos/historicoCandidatos.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  selectedFile: File = null;
  message: string = null;
  constructor(private http: HttpClient) { }

  insereCandidatos(param: Candidatos) {
    return this.http.post(environment.api + "candidatos", param, { headers: httpOptions.headers, observe: 'response' });
  }

  atualizaCandidatos(param: Candidatos) {
    return this.http.put(environment.api + "candidatos/" + param.id, param, { headers: httpOptions.headers, observe: 'response' });
  }

  
  getListaCandidatos() {
    return this.http.get<Candidatos[]>(environment.api + 'candidatos');
  }

  getListaCandidatosDisponivel(){
    return this.http.get<Candidatos[]>(environment.api + 'candidatosdisponivel');
  }

  getCandidatosId(id) {
    return this.http.get<Candidatos>(environment.api + 'candidatos/' + id);
  }

  deleteVagas(id) {
    return this.http.delete(environment.api + "candidatos/" + id, { headers: httpOptions.headers, observe: 'response' });
  }

  getListaCandidatosPorVaga(id) {
    return this.http.get<Candidatos[]>(environment.api + 'candidatosvaga/' + id);
  }

  getListaCandidatosPorStatus(idStatus: number) {
    return this.http.get<Candidatos[]>(environment.api + 'candidatosstatus/' + idStatus);
  }

  desvincularCandidato(param: Candidatos){
    return this.http.put(environment.api + "desvincular/" + param.id, param, { headers: httpOptions.headers, observe: 'response' });
  }

  getHistoricoCandidatos(id){
    return this.http.get<HistoricoCandidatos[]>(environment.api + 'historicocandidatos/' + id);
  }

}






