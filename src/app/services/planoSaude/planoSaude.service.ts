import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlanoSaude } from 'src/app/models/planoSaude/planoSaude.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(private http: HttpClient) { }

  getPlanoSaude() {
    return this.http.get<Array<PlanoSaude>>(environment.api + "plano");
  }
}