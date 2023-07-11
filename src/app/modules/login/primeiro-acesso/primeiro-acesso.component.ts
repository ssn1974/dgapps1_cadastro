import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogSucessComponent } from '../dialog/dialog-sucess/dialog-sucess.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  usuario: Usuario = new Usuario;
  logoQintess: string = './assets/Logo-qintess-branco.jpg';
  formPrimeiroAcesso: FormGroup;
  email: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    public dialog: MatDialog,
    private nt: NotifierService,
  ) { }

  ngOnInit() {
    this.form1();
  }

  form1(){
    this.formPrimeiroAcesso = this.formBuilder.group({
      codigoRe: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
    });
  }

  volta(){
    this.router.navigate(['login/']);
  }


  buscaDados(codigoRe: string) {
   var url = this.usuarioService.getUsuarioRe(codigoRe);
   url.subscribe(data => {
    if(data) {
      (<HTMLInputElement>document.getElementById("nome")).value = data['nome'];
      this.usuario.nome = data['nome'];
      (<HTMLInputElement>document.getElementById("email")).value = data['email'];
      this.usuario.email = data['email']
    } else{
      (<HTMLInputElement>document.getElementById('nome')).value=("");
    }
  }, error => {
    this.nt.notify("error", "Matrícula não cadastrada");
  });
  return url;
  }


  recuperarSenha() {
    const codigoRe = (<HTMLInputElement>document.getElementById("codigoRe")).value ; // código de recuperação da senha, obtido a partir de um formulário na página
    const url = `http://127.0.0.1:8080/redefinirsenha`;
    const body = { codigoRe };
    this.http.post(url, body).subscribe(() => {
     this.addLive1()
    }, (error) => {
      if (error.status === 500) {
      this.addLive()
      }
    });
  }


  addLive(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  
    });
  }

  addLive1(): void {
    const dialogRef = this.dialog.open(DialogSucessComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
  
    });
  }

}
