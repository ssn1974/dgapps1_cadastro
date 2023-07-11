import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidatos } from 'src/app/models/candidato/candidatos.model';
import { HistoricoCandidatos } from 'src/app/models/historico/historicoCandidatos/historicoCandidatos.model';
import { CandidatosService } from 'src/app/services/candidatos/candidatos.service';
import { ErrorDialogComponent } from '../dialog/ErrorDialogComponent/erroDialog.component';
import { ErrorDialogVagaComponent } from '../dialog/ErroDialogVaga/ErroDialogVaga.component';
import { PropostaService } from 'src/app/services/proposta/proposta.service';
import { HistoricoProposta } from 'src/app/models/historico/historicoProposta/historicoProposta.model';
import { Proposta } from 'src/app/models/proposta/proposta.model';

@Component({
  selector: 'app-detalhes-candidatos',
  templateUrl: './detalhes-candidatos.component.html',
  styleUrls: ['./detalhes-candidatos.component.css']
})
export class DetalhesCandidatosComponent implements OnInit {

  id: String;
  id_p: String;
  rh: Candidatos = new Candidatos();
  proposta: Proposta =  new Proposta();
  id_candidatos: String;
  id_proposta: number;
  historicoCandidatos: HistoricoCandidatos[] = [];
  historicoProposta: HistoricoProposta[] = [];
  historicoProposta1: HistoricoProposta = new HistoricoProposta();
  colunas = [
    'status_candidato', 'remuneracao','flash','data_inicio',  'vigente'
    ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rhService: CandidatosService,
    private propostaService: PropostaService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.carregaUsuarios();
    this.carregaProposta();
    this.mostrarhistoricoCandidatos();
    this.mostrarhistoricoProposta();
  }

  carregaUsuarios() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rhService.getCandidatosId(this.id).subscribe(
      (rh) => {
        this.rh = rh;
      }
    );
  }

  carregaProposta() {
    this.id_p = this.route.snapshot.paramMap.get('id_p');
    this.propostaService.getPropostaId(this.id_p).subscribe(
      (rh) => {
        this.proposta = rh;
      }
    );
  }


  volta(){
    this.router.navigate(['candidato/']);
  }
  
  editaUsuario() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['cadastro-candidato/' + this.id]);
  }

  downloadFile = (id: number, fileName: string) => {
    const url = `http://localhost:8080/download/${id}`;
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
          throw new Error('Erro ao fazer download do arquivo');
        }
  
        // Converte a resposta em um blob
        return response.blob();
      })
      .then((blob) => {
        // Cria um link para fazer o download do arquivo
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
        // Trata o erro
      });
  };

  vincularProposta() {
    this.id_candidatos = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['proposta'], { queryParams: { id_candidatos: this.id_candidatos }});
  }
  
  mostrarhistoricoCandidatos() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.rhService.getHistoricoCandidatos(this.id).subscribe(
        data => {
        this.historicoCandidatos = data;
      });
  } 

  mostrarhistoricoProposta() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.propostaService.getHistoricoProposta(this.id).subscribe(
      data => {
        this.historicoProposta = data;
        this.id_proposta = this.historicoProposta[0].proposta.id; // Obter o ID da proposta do primeiro elemento do histórico (se existir)
      },
      error => {
        console.error(error);
      }
    );
  }



  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '400px',
    });
}

openErrorDialogVaga(message: string): void {
  this.dialog.open(ErrorDialogVagaComponent, {
    data: { message },
    width: '400px',
  });
}

ValidacaoProposta() {
  if (!this.rh.vagas) {
    const mensagem1 = 'O candidato não está vinculado a nenhuma vaga.';
    this.openErrorDialogVaga(mensagem1);
    return;
  }

  const processosNecessarios = [
    { id: 5, nome: 'Aprovação Técnica' },
    { id: 13, nome: 'Aprovação de RH' }
  ]; // Processos necessários com seus respectivos IDs e nomes

  const processosFaltantes = processosNecessarios.filter((processo) => {
    return !this.historicoCandidatos.some(
      (historico) => historico.status_candidato.id === processo.id
    );
  });

  if (processosFaltantes.length === 0) {
    this.vincularProposta();
  } else {
    const processosFaltantesNomes = processosFaltantes.map(
      (processo) => processo.nome
    );
    const mensagem = `O candidato não passou pelos seguintes processos: ${processosFaltantesNomes.join(', ')}.`;
    this.openErrorDialog(mensagem);
  }
}

detalhesProposta() {
  this.id_candidatos = this.route.snapshot.paramMap.get('id');
  this.router.navigate(['propostas'], { queryParams: { id_candidatos: this.id_candidatos, id_proposta: this.id_proposta }});
}

}
