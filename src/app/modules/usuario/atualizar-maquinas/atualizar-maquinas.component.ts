import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricoMaquinas } from 'src/app/models/historico/historicoMaquinas/historicoMaquinas.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import * as printJS from 'print-js';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-atualizar-maquinas',
  templateUrl: './atualizar-maquinas.component.html',
  styleUrls: ['./atualizar-maquinas.component.css']
})
export class AtualizarMaquinasComponent implements OnInit {

  form: FormGroup;
  mostrarDevo: boolean;
  mostrarEditar: boolean;
  mostrarEntrega: boolean;
  mostrarAtualizar: boolean;
  usuario: Usuario = new Usuario();
  id: String;
  historico: HistoricoMaquinas = new HistoricoMaquinas();
  historicos: HistoricoMaquinas[] = [];

  colunas = [
    'equipamento','modelo','patrimonio','tag', 'data_inicio'
  ];
  colunas1 = [
    'equipamento','modelo','patrimonio','tag', 'data_inicio', 'data_final'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private us: UsuarioService,
  ) { }

  ngOnInit() {
    this.carregaUsuarios();
    this.montaFormBuilder();
  }

  carregaUsuarios() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.us.getHistoricoMaquinas(this.id).subscribe(
      (historico) => {
        this.historico = historico;
        this.historicos[0] = historico;
        (<HTMLInputElement>document.getElementById('dados-usuario')).value = JSON.stringify(historico.usuario);
          this.mostrarEditar = true;
          this.mostrarAtualizar = false;
        if(historico.data_final == null) {
          this.mostrarDevo= false;
          this.mostrarEntrega = true;
        }else{
          this.mostrarDevo= true;
          this.mostrarEditar = false;
          this.mostrarEntrega = false;
        }
      }
    );
  }

  volta(){
    this.router.navigate(['detalhesMaquinas/']);
  }



  editaUsuario() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['maquinas/' + this.id]);
    this.mostrarEditar = false;
    this.mostrarAtualizar = true;
    this.mostrarDevo = true;
  }



  PrintSimplesPDFs(){
    let dadosUsuario = JSON.parse((<HTMLInputElement>document.getElementById('dados-usuario')).value);
    let titulo = document.getElementById('divTitulo');
    let divDemandaOperacao = document.getElementById('divDemandaOperacao');
    let infoDemanda = document.createElement('b');
    let infoOperacao = document.createElement('b');
    let imprimirPDF = document.getElementById('imprimirPDF');
    imprimirPDF.style.display = 'block';
    document.getElementById('nome-pdf').innerHTML = dadosUsuario.nome;
    document.getElementById('cpf-pdf').innerHTML = dadosUsuario.cpf;
    document.getElementById('nome-ass').innerHTML = dadosUsuario.nome;
    document.getElementById('cpf-ass').innerHTML = dadosUsuario.cpf;
    document.getElementById('rg-ass').innerHTML = dadosUsuario.rg;
    titulo.style.display = 'block';
    divDemandaOperacao.style.display = "block";
    divDemandaOperacao.append(infoDemanda, infoOperacao) ;
    printJS({printable:'imprimirPDF', type:'html', targetStyle: ['border-right-width', 'border-left-width', 'border-top-width', 'border-bottom-width', 'border-style','border-color', 'display', 'width']});
    titulo.style.display = 'none';
    imprimirPDF.style.display = 'none';
  } 


  PrintSimplesPdfDevo(){
    let dadosUsuario = JSON.parse((<HTMLInputElement>document.getElementById('dados-usuario')).value);
    let titulo = document.getElementById('divTitulos');
    let divDemandaOperacao = document.getElementById('divDemandaOperacaos');
    let infoDemanda = document.createElement('b');
    let infoOperacao = document.createElement('b');
    let imprimirPDFs = document.getElementById('imprimirPDFs');
    imprimirPDFs.style.display = 'block';
    document.getElementById('nome-dev').innerHTML = dadosUsuario.nome;
    document.getElementById('cpf-dev').innerHTML = dadosUsuario.cpf;
    titulo.style.display = 'block';
    divDemandaOperacao.style.display = "block";
    divDemandaOperacao.append(infoDemanda, infoOperacao) ;
    printJS({printable:'imprimirPDFs', type:'html', targetStyle: ['border-right-width', 'border-left-width','border-top-width', 'border-bottom-width', 'border-style','border-color', 'display', 'width'], honorColor: true });
    titulo.style.display = 'none';
    imprimirPDFs.style.display = 'none';
  }


private montaFormBuilder() {
  this.form = this.formBuilder.group({
    data_final: [this.historico.data_final]
  });
  }
}

