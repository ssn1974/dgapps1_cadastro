import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }


 
  esqueceuSenha(email) {
    return this.http.post(environment.api + "esqueceuSenha" + email, { headers: httpOptions.headers, observe: 'response' });
  }
}