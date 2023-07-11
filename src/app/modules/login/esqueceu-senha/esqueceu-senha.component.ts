import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginService } from 'src/app/services/login/login.service';
import { NotifierService } from 'angular-notifier';
import { DialogSucessComponent } from '../dialog/dialog-sucess/dialog-sucess.component';



@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  logoQintess: string = './assets/Logo-qintess-branco.jpg';
  formRecuperar: FormGroup;
  email: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,


  ) { }

  ngOnInit() {
    this.form1();
  }

  form1(){
    this.formRecuperar = this.formBuilder.group({
      codigoRe: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(80)]],
    });
  }

  volta(){
    this.router.navigate(['login/']);
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
