import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Contrato } from 'src/app/models/contrato/contrato.model';
import { HistoricoOperacao } from 'src/app/models/historico/historicoOperacao/historicoOperacao.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { ContratoService } from 'src/app/services/contrato/contrato.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  listaContrato: Array<Contrato>;
  form: FormGroup;
  usuario: Usuario = new Usuario();
  id: any;
  listaCargoHistorico: Array<{id: number, descricao: string}>;
  historico: HistoricoOperacao [];
  
  colunas = [
    'operacao', 'data_inicio', 'data_final'
  ];
  mostrarTabela: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private notifier: NotifierService,
    private contratoService: ContratoService,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.mostrarhistoricoOperacao();
    this.getContrato();
    this.mostrarTabela = false;
  }

  mostrarhistoricoOperacao() {
    this.mostrarTabela = true;
    if(this.usuario.codigoRe == undefined) {
      this.historico = [];
    }else{
      this.usuarioService.getListaHistoricoOperacaoRe(this.usuario.codigoRe).subscribe(
        data => {
        this.historico = data;
      });
    }
  } 



  getNome(event: any) {
    if(event){
      var value = event.target.value;
      var url = this.usuarioService.getUsuarioRe(value);
      url.subscribe(data => {
        if(data) {
          (<HTMLInputElement>document.getElementById("nome")).value = data['nome'];
          this.usuario.nome = data['nome'];
        } else{
          (<HTMLInputElement>document.getElementById('nome')).value=("");
        }
      });
      return url;
    }
  }

  private getContrato() {
    this.contratoService.getContrato().subscribe((lista) => {
      this.listaContrato = lista;
     
    });
  }


  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      codigoRe: [this.usuario.codigoRe, [Validators.required]],
      contrato: [this.usuario.contrato, [Validators.required]],
    });
  }
  submit() {
    if (this.form.invalid) {
      this.notifier.notify("error", " Todos os campos devem ser preenchidos corretamente!");
    } else {
      this.insereContrato();
    }
  }


  private insereContrato() {
    this.usuarioService.insereContrato(this.usuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Contrato criado com sucesso!");
        location.reload()
      }
      else {
        this.notifier.notify("error", "Houve um erro no cadastro a Contrato");
      }
    }, 
    );
  }
}
