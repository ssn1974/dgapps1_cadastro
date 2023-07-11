import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tipo } from 'src/app/models/tipo/tipo.model';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  getTipo() {
    return this.http.get<Array<Tipo>>(environment.api + "tipo");
  }
}