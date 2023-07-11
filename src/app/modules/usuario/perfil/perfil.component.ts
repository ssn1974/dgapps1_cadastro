import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { HistoricoPerfil } from 'src/app/models/historico/historicoPerfil/historicoPerfil.model';
import { Perfil } from 'src/app/models/perfil/perfil.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario = new Usuario();
  listaPerfil: Array<Perfil>;
  listaPerfilHistorico: Array<{id: number, descricao: string}>;
  historico: HistoricoPerfil[] = [];
  id: any;
  colunas = [
    'perfil', 'data_inicio', 'data_final'
  ];

  mostrarTabela: boolean;
 

  constructor(
    public formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private notifier: NotifierService,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.getPerfil();
    this.mostrarhistorico();
    this.mostrarTabela = false;
  }

  atualizarListaPerfil() {
    let listaPerfilHistorico = [];
    let arrIdsHistorico = [];
  
    this.historico.forEach((historico) =>{
      arrIdsHistorico.push(historico.perfil.id);
    })
     this.listaPerfil.forEach((perfil) => {
      if(!arrIdsHistorico.includes(perfil.id)){
        listaPerfilHistorico.push(perfil);
      }
    })
    this.listaPerfil = listaPerfilHistorico;
  }
 


  mostrarhistorico() {
    if(this.usuario.codigoRe == undefined) {
      this.historico = [];
      this.mostrarTabela = false;
    }else{
      this.usuarioService.getListaHistoricoPerfilRe(this.usuario.codigoRe).subscribe(
        data => {
        this.historico = data;
        this.mostrarTabela = true;
        this.atualizarListaPerfil();
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

  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      codigoRe: [this.usuario.codigoRe, [Validators.required]],
      perfil:[this.usuario.perfil,[Validators.required]],
    });
  }

  private getPerfil() {
    this.perfilService.getPerfil().subscribe((lista) => {
      this.listaPerfil = lista;
    });
  }


  submit() {
    if (this.form.invalid) {
      this.notifier.notify("error", " Todos os campos devem ser preenchidos corretamente!");
    } else {
      this.inserePerfil();
    }
  }


  private inserePerfil() {
    this.usuarioService.inserePerfil(this.usuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Perfil criado com sucesso!");
        location.reload()
      }
      else {
        this.notifier.notify("error", "Houve um erro no cadastro a Perfil");
      }
    }, 
    );
  }

}
