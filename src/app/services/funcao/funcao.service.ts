import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcao } from 'src/app/models/cargo/funcao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  constructor(private http: HttpClient) { }

  getCargo() {
    return this.http.get<Array<Funcao>>(environment.api + "cargo");
  }
}
