import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Bu } from 'src/app/models/bu/bu.model';
import { Funcao } from 'src/app/models/cargo/funcao.model';
import { Historico } from 'src/app/models/historico/historico.model';
import { Perfil } from 'src/app/models/perfil/perfil.model';
import { Tipo } from 'src/app/models/tipo/tipo.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { BuService } from 'src/app/services/bu/bu.service';
import { FuncaoService } from 'src/app/services/funcao/funcao.service';
import { TipoService } from 'src/app/services/tipo/tipo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})


 
export class CargoComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario = new Usuario();
  listaCargo: Array<Funcao>;
  listaBu: Array<Bu>;
  listaTipo: Array<Tipo>;
  listaCargoHistorico: Array<{id: number, descricao: string}>;
  historico: Historico[] = [];
  id: any;
  colunas = [
    'cargo', 'data_inicio', 'data_final', 'vigente'
    ];
  mostrarTabela: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private buService: BuService,
    private usuarioService: UsuarioService,
    private tipoService: TipoService,
    private notifier: NotifierService,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.getCargos();
    this.getBu();
    this.getTipo();
    this.mostrarhistorico();
    this.mostrarTabela = false;
  }


  atualizarListaCargos() {
    let listaCargoHistorico = [];
    let arrIdsHistorico = [];
  
    this.historico.forEach((historico) =>{
      arrIdsHistorico.push(historico.cargo.id);
    })
     this.listaCargo.forEach((cargo) => {
      if(!arrIdsHistorico.includes(cargo.id)){
        listaCargoHistorico.push(cargo);
      }
    })
    this.listaCargo = listaCargoHistorico;
  }
 


  mostrarhistorico() {
    this.mostrarTabela = true;
    if(this.usuario.codigoRe == undefined) {
      this.historico = [];
    }else{
      this.usuarioService.getListaHistoricoRe(this.usuario.codigoRe).subscribe(
        data => {
        this.historico = data;
        this.atualizarListaCargos();
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
      cargo:[this.usuario.cargo,[Validators.required]],
      bu: [this.usuario.bu,[Validators.required]],
      tipo:[this.usuario.tipo,[Validators.required]],
    });
  }

  private getCargos() {
    this.funcaoService.getCargo().subscribe((lista) => {
      this.listaCargo = lista;
    });
  }

  private getBu() {
    this.buService.getBu().subscribe((lista) => {
      this.listaBu = lista;
    });
  }

  private getTipo() {
    this.tipoService.getTipo().subscribe((lista) => {
      this.listaTipo = lista;
    });
  }

  submit() {
    if (this.form.invalid) {
      this.notifier.notify("error", " Todos os campos devem ser preenchidos corretamente!");
    } else {
      this.insereFuncao();
    }
  }


  private insereFuncao() {
    this.usuarioService.insereFuncao(this.usuario).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Função criado com sucesso!");
        location.reload()
      }
      else {
        this.notifier.notify("error", "Houve um erro no cadastro a Função");
      }
    }, 
    );
  }
}

