import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() usuario: Usuario = new Usuario;
  lisPerfil;
  logoQintess: string = './assets/Qintess-logo-alt.jpg';
  logoQintessRed: string = './assets/qintes-logo-reduzido.jpg';
  logoBB: string = './assets/bb-logo.jpg'

  constructor(
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuarioService,

  ) { }
  

  ngOnInit() {
    window.addEventListener('message', this.handleMessageEvent.bind(this));
    let re = sessionStorage.getItem('colaborador');
    this.usuarioService.getUsuarioRe(re).subscribe(
      (usuario) => {
        this.usuario = usuario;
      }
    );
  }
 
  handleMessageEvent(event: MessageEvent) {
    // Verifica se a mensagem é do tipo 'login'
    if (event.data.type === 'login') {
      // Atualiza informações de sessão com as informações enviadas na mensagem
      sessionStorage.setItem('colaborador', event.data.colaborador);
    }
  }


  adm(id: number): boolean {
    return id === 1;
  }
  
  admGestor(id: number): boolean {
    return id === 1 || id === 2;
  }
  
  gestor(id: number): boolean {
    return id === 2;
  }
  
  rh(id: number): boolean {
    return id === 3;
  }
  
  rhGestor(id: number): boolean {
    return id === 3 || id === 2;
  }
  
  colaborador(id: number): boolean {
    return id === 4;
  }

  admRhGestor(id: number): boolean {
    return id ===1 || id === 3 || id === 2 ;
  }
  
  deslogaUsuario() {
    this.loginService.deslogaUsuario();
    this.router.navigate(['login']);
  }
}
