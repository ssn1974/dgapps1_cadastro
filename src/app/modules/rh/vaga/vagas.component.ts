import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Vagas } from 'src/app/models/vagas/vagas.model';
import { VagasService } from 'src/app/services/vagas/vagas.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { Etapa } from 'src/app/models/etapa/etapa.model';
import { EtapaService } from 'src/app/services/etapa/etapa.service';


@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {

  listaEtapaVagas: Array<Etapa>;
  form: FormGroup;
  rh: Vagas[] = [];
  vagas:  Vagas= new Vagas(); 
  colunas = [
    'qualitor','cargo','especialidade','remuneracao',  'status' , 'etapa', 'recrutador', 'data_inicio', 'data_final', 'acoes'
  ];
  
  constructor(
    private rhService: VagasService,
    private etapa: EtapaService,
    private router: Router,
    private notifier: NotifierService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.montaFormBuilder();
    this.getEtapa();
    this.listaRh();
  }

  listaRh(){
    this.rhService.getListaVagas().subscribe(
      data => {
      this.rh = data;
    });
  }

  detalhesCandidato(row: { id: string; }) {
    this.router.navigate(['/../vagas/' + row.id]);
  }

  searchAllField(event: any) {
    this.rh = this.rh.filter(obj => {
      return Object.keys(obj).find((key) => {
        return obj[key] ? ((obj[key].descricao ? obj[key].descricao : obj[key]).toString().toUpperCase()).includes(event.target.value.toUpperCase()) : false;
      });
    })
  }

  private getEtapa() {
    this.etapa.getEtapa().subscribe((lista) => {
      this.listaEtapaVagas = lista;
    });
  }

  cancelarStatus(candidato: any) {
    this.rhService.atualizaStatus(candidato).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "STATUS DO VAGA ALTERADO PRA CANCELADO COM SUCESSO !", '5000');
        this.router.navigate(['vagas']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro ao cancelar o status do candidato, por favor tente novamente.");
      }
    }, 
    );
  }

  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      etapa: [this.vagas.etapa,[Validators.required]],
    });
  }

  
  listaVagasPorEtapa(event: any){
    this.rhService.getListaVagasPorEtapa(event.target.value).subscribe(
      data => {
      this.rh = data;
    })
  }

}
