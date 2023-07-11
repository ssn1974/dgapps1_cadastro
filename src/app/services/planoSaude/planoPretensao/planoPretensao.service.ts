import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlanoPretensao } from 'src/app/models/PlanoPretensao/planoPretensao.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoPretensaoService {

  constructor(private http: HttpClient) { }

  getPlanoSaudePretensao() {
    return this.http.get<Array<PlanoPretensao>>(environment.api + "plano_pretensao");
  }
}