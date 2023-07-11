import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Especialidade } from 'src/app/models/especialidade/Especialidade.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient) { }

  getEspecialidade() {
    return this.http.get<Array<Especialidade>>(environment.api + "especialidade");
  }
}