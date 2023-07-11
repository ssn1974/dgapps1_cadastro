import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Candidatos } from 'src/app/models/candidato/candidatos.model';
import { HistoricoCandidatos } from 'src/app/models/historico/historicoCandidatos/historicoCandidatos.model';
import { HistoricoProposta } from 'src/app/models/historico/historicoProposta/historicoProposta.model';
import { Proposta } from 'src/app/models/proposta/proposta.model';
import { StatusCandidato } from 'src/app/models/statusCandidato/statusCandidato.model';
import { CandidatosService } from 'src/app/services/candidatos/candidatos.service';
import { PropostaService } from 'src/app/services/proposta/proposta.service';
import { StatusCandidatoService } from 'src/app/services/statusCandidato/statusCandidato.service';
import { ErrorDialogComponent } from '../../dialog/ErrorDialogComponent/erroDialog.component';
import { MatDialog } from '@angular/material';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { ErrorDialogPropostaComponent } from '../../dialog/ErroDialogProposta/erroDialogProposta.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-atualizar-proposta',
  templateUrl: './atualizar-proposta.component.html',
  styleUrls: ['./atualizar-proposta.component.css']
})
export class AtualizarPropostaComponent implements OnInit {

  @Input() usuario: Usuario = new Usuario;
  historicoCandidatos: HistoricoCandidatos[] = [];
  listaStatusCandidato: Array<StatusCandidato>;
  selectAllOption1: boolean = false;
  form: FormGroup;
  id: string;
  candidato: Candidatos
  id_candidatos: string;
  id_proposta: String;
  historicoProposta: HistoricoProposta;
  proposta: Proposta = new Proposta();
  constructor(
    public formBuilder: FormBuilder,
    private candidatosService: CandidatosService,
    private route: ActivatedRoute,
    private router: Router,
    private propostaService: PropostaService,
    private notifier: NotifierService,
    private statusCandidatoService: StatusCandidatoService,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.carregaUsuarios();
    this.carregaProposta();
    this.getStatusCandidato();
    setTimeout(()=>{
  }, 200); 
  window.addEventListener('message', this.handleMessageEvent.bind(this));
  let re = sessionStorage.getItem('colaborador');
  this.usuarioService.getUsuarioRe(re).subscribe(
    (usuario) => {
      this.usuario = usuario;
    }
  );
  }

  handleMessageEvent(event: MessageEvent) {
    // Verifica se a mensagem é do tipo 'login'
    if (event.data.type === 'login') {
      // Atualiza informações de sessão com as informações enviadas na mensagem
      sessionStorage.setItem('colaborador', event.data.colaborador);
    }
  }



  carregaUsuarios() {
    this.id_candidatos = this.route.snapshot.queryParamMap.get('id_candidatos'); 
    this.candidatosService.getCandidatosId(this.id_candidatos).subscribe(
      (candidato) => {
        this.candidato = {...candidato!};
      }
    );
  }

  private carregaProposta() {
    this.id_proposta= this.route.snapshot.queryParamMap.get('id_proposta'); 
    this.propostaService.getPropostaId(this.id_proposta).subscribe(
      (candidato) => {
        this.proposta = {...candidato!};
      }
    );
  }

  selectAllOptions1() {
    if (this.proposta.vale_refeicao) {
      this.proposta.vale_alimentacao = false; // Desabilita o campo "Vale Alimentação"
    }
    this.proposta.seguro_vida = this.selectAllOption1;
    this.proposta.plano_odonto = this.selectAllOption1;
    this.proposta.plano_saude = this.selectAllOption1;
  }
  

  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      remuneracao: [this.proposta.remuneracao, [Validators.required]],
      status_candidato:[this.proposta.status_candidatos, [Validators.required]],
      vale_alimentacao: [this.proposta.vale_alimentacao],
      vale_refeicao:[this.proposta.vale_refeicao],
      plano_saude: [this.proposta.plano_saude],
      plano_odonto:[this.proposta.plano_odonto],
      seguro_vida: [this.proposta.seguro_vida],
      flash:[this.proposta.flash],
      candidato: [this.proposta.candidatos],
    });
    let remuneracao = document.getElementById('remuneracao');
    let flash = document.getElementById('flash');

    remuneracao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('remuneracao')).value = formataMoeda((event.target as HTMLInputElement).value);     
    });

    flash.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('flash')).value = formataMoeda((event.target as HTMLInputElement).value);      
    });

    function formataMoeda(value){
      let valor = value;
  
      valor = valor + '';
      valor = parseInt(valor.replace(/[\D]+/g, ''));
      valor = valor + '';
      valor = valor.replace(/([0-9]{2})$/g, ",$1");
      if(valor.length > 6){
          valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }
      if(valor == 'NaN'){
        return '';
      }
      return valor;
    }
  }


  private getStatusCandidato() {
    this.statusCandidatoService.getStatusCandidato().subscribe((lista) => {
      this.listaStatusCandidato = lista;
    });
  }

  volta(){
    this.router.navigate(['candidato/']);
  }


  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '400px',
    });
}


openErrorDialogProposta(message: string): void {
  this.dialog.open(ErrorDialogPropostaComponent, {
    data: { message },
    width: '400px',
  });
}



  // atualizei aqui

  private atualizaProposta() {
    this.propostaService.atualizaProposta(this.proposta).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "DADOS DO CANDIDATO ATUALIZADO COM SUCESSO !");
        this.router.navigate(['candidato']);
      }
      else {
        this.notifier.notify("error", "Ocorreu um erro na atualização, por favor tente novamente.");
      }
    }, 
   );
  }


  ValidacaoProposta() {
   
    // Verifica se o ID do status é igual a 10 (aprovação de proposta)
    if (this.proposta.status_candidatos.id === 10) {
      const usuarioLogado = this.usuario; // Obtém o usuário logado do serviço
  
      // Verifica se o usuário possui o cargo de DO (ID 168) ou GO (ID 169)
      if (usuarioLogado.perfil.id === 168 || usuarioLogado.perfil.id === 169) {
        // Restante do código para vincular a proposta
        this.proposta.candidatos = this.candidato;
        this.propostaService.atualizaProposta(this.proposta).subscribe((data) => {
          if (data.status == 200) {
            this.notifier.notify("success", "PROPOSTA ATUALIZADA COM SUCESSO!");
            this.router.navigate(['candidato']);
          } else {
            this.notifier.notify("error", "Ocorreu um erro ao cadastrar. Por favor, verifique os dados e tente novamente.");
          }
        });
      } else {
        const mensagem = `Você não possui permissão para aprovar esta proposta. Apenas DO e GO`;
        this.openErrorDialogProposta(mensagem);
      }
    } else {
      // Código para inserir a proposta sem a validação de perfil
      this.proposta.candidatos = this.candidato;
      this.propostaService.atualizaProposta(this.proposta).subscribe((data) => {
        if (data.status == 200) {
          this.notifier.notify("success", "PROPOSTA ATUALIZADA COM SUCESSO!");
          this.router.navigate(['candidato']);
        } else {
          this.notifier.notify("error", "Ocorreu um erro ao cadastrar. Por favor, verifique os dados e tente novamente.");
        }
      });
    }
  }



  
  preencheCampos(){
    this.populaCampo('select-statusCandidatos', this.proposta.status_candidatos);
    this.populaCampo('remuneracao', this.proposta.remuneracao);
    this.populaCampo('flash', this.proposta.flash);
  }

  populaCampo(id: string, obj: any) {
    if (obj != undefined) {
      const selectElement = document.getElementById(id) as HTMLSelectElement;
      if (selectElement) {
        for (let x = 0; x < selectElement.options.length; x++) {
          let item = selectElement.options[x];
          if (item.id == obj.id) {
            item.selected = true;
            break;
          }
        }
      }
    }
  }


}
