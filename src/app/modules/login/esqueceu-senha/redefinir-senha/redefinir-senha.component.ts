import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario/usuario.model';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  logoQintess: string = './assets/Logo-qintess-branco.jpg';

  id: any;
  usuario: any;
  usuarios: Usuario = new Usuario();
  token: string;
  formRedefinirSenha: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private notifier: NotifierService,
    private http: HttpClient
    ) { }


  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.carregaUsuarios();
    this.form1();
  }

  form1(){
    this.formRedefinirSenha = this.formBuilder.group({
      senha: [this.usuarios.senha, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
    });
  }

  volta(){
    this.router.navigate(['login/']);
  }

  private carregaUsuarios() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.http.get( environment.api + 'usuario/token/' + this.token).subscribe(
        (usuario) => {
          this.usuario = usuario;
    
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  submit() {
    if (this.formRedefinirSenha.invalid) {
      this.notifier.notify("error", " Todos os ampos devem ser preenchidos corretamente!");
    }  else if(this.token){
        this.enviar();
    }
  }

  private enviar() {
    const novoUsuario = { ...this.usuario, senha: this.formRedefinirSenha.get('senha').value };
    this.usuarioService.atualizaUsuarioSenha(novoUsuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Senha cadastrada com sucesso!");
        this.router.navigate(['usuarios']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro no cadastro de senha, por favor tente novamente.");
      }
    }, 
   );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
