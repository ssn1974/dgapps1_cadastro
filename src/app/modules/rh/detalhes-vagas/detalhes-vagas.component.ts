import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Candidatos} from 'src/app/models/candidato/candidatos.model';
import { Vagas } from 'src/app/models/vagas/vagas.model';
import { CandidatosService } from 'src/app/services/candidatos/candidatos.service';
import { VagasService } from 'src/app/services/vagas/vagas.service';

@Component({
  selector: 'app-detalhes-vagas',
  templateUrl: './detalhes-vagas.component.html',
  styleUrls: ['./detalhes-vagas.component.css']
})
export class DetalhesVagasComponent implements OnInit {

  id: String;
  id_vaga: String;
  rh: Vagas = new Vagas();
  candidatos: Candidatos[] = [];
  candidato1:  Candidatos= new Candidatos(); 

  colunas = [
  'candidatos', 'cpf', 'status_candidato', "acoes"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rhService: VagasService,
    private candidatoService: CandidatosService,
    private notifier: NotifierService,
    
  ) { }

  ngOnInit() {
    this.carregaUsuarios();
    this.listacandidatosPorVaga();
  }


  listacandidatosPorVaga(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.candidatoService.getListaCandidatosPorVaga(this.id).subscribe(
      data => {
      this.candidatos = data;
    })
  }


  carregaUsuarios() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rhService.getVagasId(this.id).subscribe(
      (rh) => {
        this.rh = rh;
      }
    );
  }
  volta(){
    this.router.navigate(['vagas/']);
  }
  editaVaga() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['cadastro-vagas/' + this.id]);
  }

  vincularCandidatoNovo(){
    this.id_vaga = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['cadastro-candidato/'],{queryParams: {"id_vaga": this.id_vaga}});
  }


  vincularCandidatoPesquisa(id: any){
    this.id_vaga = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/../candidatodisponivel/'],{ queryParams:{"id_vaga": this.id_vaga}});
  }

  
  detalhesCandidato(row: { id: string; }) {
    this.router.navigate(['cadastro-candidato/' +  row.id]);
  }


  desvincularCandidato(candidato: any) {
    this.candidatoService.desvincularCandidato(candidato).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "Candidato desvinculado a vaga");
        this.router.navigate(['vagas']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro ao desvincular candidato, por favor tente novamente.");
      }
    }, 
    );
  }
}