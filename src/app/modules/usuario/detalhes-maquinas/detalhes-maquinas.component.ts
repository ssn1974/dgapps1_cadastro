import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoricoMaquinas } from 'src/app/models/historico/historicoMaquinas/historicoMaquinas.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-detalhes-maquinas',
  templateUrl: './detalhes-maquinas.component.html',
  styleUrls: ['./detalhes-maquinas.component.css']
})
export class DetalhesMaquinasComponent implements OnInit {

  historico: HistoricoMaquinas[] = [];
  historicoOriginal: HistoricoMaquinas[] = [];
  usuarios: Usuario[] = [];
  colunas = [
   'nome', 'codigoRe','memoria','equipamento','modelo','patrimonio','tag', 'data_inicio', 'data_final'
  ];

  constructor(
    private us: UsuarioService,
    private router: Router,
    ) { 

    }

  ngOnInit() {
    this.us.getListaHistorico().subscribe(
      data => {
      this.historicoOriginal = data;
      this.historico = data;
    });
  }

  AtualizarMaquinas(row: { id: string; }) {
    this.router.navigate(['/../detalhesMaquinas/' + row.id]);
  }

 
  searchAllField(event: any) {
    const searchTerm = event.target.value.toUpperCase();
    if (searchTerm === '') {
      this.historico = this.historicoOriginal; 
      return;
    }
    this.historico = this.historicoOriginal.filter(obj => {
      return Object.keys(obj).find((key) => {
        return obj[key] ? ((obj[key].descricao ? obj[key].descricao : obj[key]).toString().toUpperCase()).includes(searchTerm) : false;
      });
    });
  }
}




