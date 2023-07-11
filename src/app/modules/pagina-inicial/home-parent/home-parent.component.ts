import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.css']
})
export class HomeParentComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessageEvent.bind(this));
    let re = sessionStorage.getItem('colaborador');
    this.usuarioService.getUsuarioRe(re).subscribe(
      (usuario) => {
        this.usuario = usuario;
      });
  }

  handleMessageEvent(event: MessageEvent) {
    // Verifica se a mensagem é do tipo 'login'
    if (event.data.type === 'login') {
      // Atualiza informações de sessão com as informações enviadas na mensagem
      sessionStorage.setItem('colaborador', event.data.colaborador);
    }
  }
}