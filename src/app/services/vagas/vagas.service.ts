import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vagas } from 'src/app/models/vagas/vagas.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VagasService {

  constructor(private http: HttpClient) { }


  getVagasQualitor(nr: string) {
    return this.http.get<Vagas>(environment.api + 'vagasqualitor/' + nr);
  }

  insereVagas(param: Vagas) {
    return this.http.post(environment.api + "vagas", param, { headers: httpOptions.headers, observe: 'response' });
  }

  atualizaVagas(param: Vagas) {
    return this.http.put(environment.api + "vagas/" + param.id, param, { headers: httpOptions.headers, observe: 'response' });
  }

  getListaVagas() {
    return this.http.get<Vagas[]>(environment.api + 'vagas');
  }

  getVagasId(id) {
    return this.http.get<Vagas>(environment.api + 'vagas/' + id);
  }

  deleteVagas(id) {
    return this.http.delete(environment.api + "vagas/" + id, { headers: httpOptions.headers, observe: 'response' });
  }

  atualizaStatus(param: Vagas) {
    return this.http.put(environment.api + "vagasStatus/" + param.id, param, { headers: httpOptions.headers, observe: 'response' });
  }


  vincularVagas(param: Vagas){
    return this.http.post(environment.api + "vincular", param, { headers: httpOptions.headers, observe: 'response' });
  }

  getVagas() {
    return this.http.get<Array<Vagas>>(environment.api + "vagas");
  }


  getListaVagasPorEtapa(idEtapa: number) {
    return this.http.get<Vagas[]>(environment.api + 'vagasetapa/' + idEtapa);
  }
}