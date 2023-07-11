import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StatusCandidato } from 'src/app/models/statusCandidato/statusCandidato.model';

@Injectable({
  providedIn: 'root'
})
export class StatusCandidatoService {

  constructor(private http: HttpClient) { }

  getStatusCandidato() {
    return this.http.get<Array<StatusCandidato>>(environment.api + "status_candidato");
  }
}