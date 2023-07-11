import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })

};

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private http: HttpClient) { }

  alteraStatusMsg(param) {
    return this.http.post(environment.api + 'mensagem-status', param, { headers: httpOptions.headers, observe: 'response' });
  }

  marcaMsgLida(param) {
    return this.http.post(environment.api + 'mensagem-lida', param, { headers: httpOptions.headers, observe: 'response' });
  }

  getMensagensColaborador(id) {
    return this.http.get(environment.api + 'mensagens/usuario/' + id);
  }

  detalhaMensagem(id) {
    return this.http.get(environment.api + 'mensagem/' + id);
  }

  getMensagensEnviadas() {
    return this.http.get(environment.api + 'mensagens');
  }

  enviaMensagemGeral(param) {
    return this.http.post(environment.api + 'mensagem-geral', param, { headers: httpOptions.headers, observe: 'response' });
  }

  getHistoricoMsgColaborador(id) {
    return this.http.get<Array<any>>(environment.api + 'historico-mensagens/usuario/' + id);
  }

}
