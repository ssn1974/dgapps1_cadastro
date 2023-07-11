import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Candidatos } from 'src/app/models/candidato/candidatos.model';
import { Vagas } from 'src/app/models/vagas/vagas.model';
import { CandidatosService } from 'src/app/services/candidatos/candidatos.service';
import { StatusCandidatoService } from 'src/app/services/statusCandidato/statusCandidato.service';
import { VagasService } from 'src/app/services/vagas/vagas.service';

@Component({
  selector: 'app-candidatos-disponivel',
  templateUrl: './candidatos-disponivel.component.html',
  styleUrls: ['./candidatos-disponivel.component.css']
})
export class CandidatosDisponivelComponent implements OnInit {


  listaVagas: Array<Vagas>;
  mostrarInserir: boolean;
  mostrarVincular:boolean;
  dataSource = new MatTableDataSource<Candidatos>();
  selection = new SelectionModel<Candidatos>(true, []);
  candidatos:  Candidatos[] = [];
  candidatos1:  Candidatos = new Candidatos(); 

  candidatoVinculado: Candidatos[] = [];

  vagas: Vagas;
  colunas = [
   'acoes','candidatos','cpf','rg',  'email' , 'telefone','status', 'vaga'
  ];
  constructor(
    private rhService: CandidatosService,
    private router: Router,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private vagasService: VagasService,
  ) { }

  ngOnInit() {
    this.listaCandidatosDisponivel();
    this.mostrarVincular =  false;
    this.getVagas();
    setTimeout(()=>{
      this.vagas = this.recuperarVagaPorId(this.route.snapshot.queryParamMap.get('id_vaga'), this.listaVagas);
    }, 1300);
  }
  listaCandidatosDisponivel(){
    this.rhService.getListaCandidatosDisponivel().subscribe(
      data => {
      this.candidatos = data;
    });
  }

  detalhesCandidato(row: { id: string; }) {
    this.router.navigate(['/../candidato/' + row.id]);
  }

  searchAllField(event: any) {
    this.candidatos = this.candidatos.filter(obj => {
      return Object.keys(obj).find((key) => {
        return obj[key] ? ((obj[key].descricao ? obj[key].descricao : obj[key]).toString().toUpperCase()).includes(event.target.value.toUpperCase()) : false;
      });
    })
  }

  vincularCandidato(){
    const url = window.location.href;
    const newUrl = url.replace("http://localhost:4200", "");
    this.candidatoVinculado.map((cadidato) => {
      cadidato.vagas = this.vagas;
    })
    this.candidatos1.vagas = this.vagas;
    if(this.vagas === undefined){
      alert(newUrl);
    }else{
      this.candidatoVinculado.map((c) => {
        this.rhService.atualizaCandidatos(c).subscribe((data) => {
          if (data.status == 200) {
            this.notifier.notify("success", "CANDIDATO VINCULADO COM SUCESSO !");
            this.router.navigate(['vagas']);
          }
          else{
              alert("Erro em cadastrar atualizar o candidato")
          }
        });
      })
    }
  }

  private getVagas() {
    this.vagasService.getVagas().subscribe((lista) => {
      this.listaVagas = lista;
    });
  }

  private recuperarVagaPorId(id_vaga, listaVagas){
    for(let x in listaVagas ){
      let vaga = listaVagas[x];
      if(parseInt(id_vaga) == vaga.id){
        return vaga;
      }
    }
  }
  
  isAllSelected() {
    this.mostrarVincular = true;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;  
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row))
  }

 MensagemdeAlerta(row: { id: string;}){
    this.rhService.getCandidatosId(row.id).subscribe(
    (rh) => {
      this.candidatos1 = rh;
      this.candidatoVinculado.push(this.candidatos1)
    });

  }
}


