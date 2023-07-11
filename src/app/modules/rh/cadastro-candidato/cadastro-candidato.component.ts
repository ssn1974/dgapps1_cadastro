import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Candidatos } from 'src/app/models/candidato/candidatos.model';
import { PlanoPretensao } from 'src/app/models/PlanoPretensao/planoPretensao.model';
import { PlanoSaude } from 'src/app/models/planoSaude/planoSaude.model';
import { StatusCandidato } from 'src/app/models/statusCandidato/statusCandidato.model';
import { Vagas } from 'src/app/models/vagas/vagas.model';
import { CandidatosService } from 'src/app/services/candidatos/candidatos.service';
import { PlanoPretensaoService } from 'src/app/services/planoSaude/PlanoPretensao/PlanoPretensao.service';
import { PlanoService } from 'src/app/services/planoSaude/planoSaude.service';
import { StatusCandidatoService } from 'src/app/services/statusCandidato/statusCandidato.service';
import { VagasService } from 'src/app/services/vagas/vagas.service';


@Component({
  selector: 'app-cadastro-candidato',
  templateUrl: './cadastro-candidato.component.html',
  styleUrls: ['./cadastro-candidato.component.css']
})
export class CadastroCandidatoComponent implements OnInit {

  form: FormGroup;
  mostrarObservacao: boolean;
  mostrarStatus: boolean;
  mostrarAtualizar: boolean;
  mostrarInserir: boolean
  selectedFile: File = null;
  message: string = null;
  mostrarUpload: boolean;
  documents: string [] 
  listaVagas: Array<Vagas>;
  listaStatusCandidato: Array<StatusCandidato>;
  listaPlano: Array<PlanoSaude>;
  listaPlanoSaudePretensao: Array<PlanoPretensao>
  candidato: Candidatos = new Candidatos();
  vagas: Vagas;
  mensagem: string = '';
  id_vaga: string;
  id: string;



  constructor(
    public formBuilder: FormBuilder,
    private notifier: NotifierService,
    private candidatoService: CandidatosService,
    private router: Router,
    private route: ActivatedRoute,
    private statusCandidatoService: StatusCandidatoService,
    private vagasService: VagasService,
    private planoService: PlanoService,
    private planoPretensaoService: PlanoPretensaoService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.montaFormBuilder();
    this.carregaUsuarios();
    this.getStatusCandidato();
    this.getPlanoSaude();
    this.getPlanoSaudePretensao();
    this.mostrarStatus = false;
    this.mostrarInserir = true;
    this.getVagas();
    setTimeout(()=>{
      this.preencheCampos();
      this.vagas = this.recuperarVagaPorId(this.route.snapshot.queryParamMap.get('id_vaga'), this.listaVagas);
    }, 1300); 
  }


  private montaFormBuilder() {
    this.form = this.formBuilder.group({
      cpf: [this.candidato.cpf, [Validators.required]],
      rg: [this.candidato.rg, [Validators.required]],
      telefone: [this.candidato.telefone, [Validators.required]],
      nome: [this.candidato.candidatos, [Validators.required]],
      email: [this.candidato.email, [Validators.required]],
      va_atual: [this.candidato.vale_alimentacao_atual],
      vr_atual: [this.candidato.vale_refeicao_atual],
      bonus_atual: [this.candidato.bonus_atual],
      remuneracao_atual: [this.candidato.remuneracao_atual, [Validators.required]],
      planoSaude: [this.candidato.planoSaude, [Validators.required]],
      cesta_atual: [this.candidato.cesta_atual],
      flash_atual: [this.candidato.flash_atual],
      arquivos: [ this.candidato.arquivos],
      status_candidato:[this.candidato.status_candidato],
// --------------------------------------------------------------
      va_pretensao: [this.candidato.vale_alimentacao_pretensao],
      vr_pretensao: [this.candidato.vale_refeicao_pretensao],
      bonus_pretensao: [this.candidato.bonus_pretensao],
      remuneracao_pretensao: [this.candidato.remuneracao_pretensao, [Validators.required]],
      planoPretensao: [this.candidato.planoPretensao, [Validators.required]],
      cesta_pretensao: [this.candidato.cesta_pretensao],
      flash_pretensao: [this.candidato.flash_pretensao],
      vagas: [ this.candidato.vagas],
      observacao: [this.candidato.observacao]
    });
    let remuneracao_atual = document.getElementById('remuneracao_atual');
    let va_atual = document.getElementById('va_atual');
    let vr_atual = document.getElementById('vr_atual');
    let bonus_atual = document.getElementById('bonus_atual');
    let flash_atual = document.getElementById('flash_atual');
    let cesta_atual = document.getElementById('cesta_atual');
    let remuneracao_pretensao = document.getElementById('remuneracao_pretensao');
    let va_pretensao = document.getElementById('va_pretensao');
    let vr_pretensao = document.getElementById('vr_pretensao');
    let bonus_pretensao = document.getElementById('bonus_pretensao');
    let flash_pretensao = document.getElementById('flash_pretensao');
    let cesta_pretensao = document.getElementById('cesta_pretensao');

    remuneracao_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('remuneracao_atual')).value = formataMoeda((event.target as HTMLInputElement).value);     
    });
    va_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('va_atual')).value = formataMoeda((event.target as HTMLInputElement).value);      
    });
    vr_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('vr_atual')).value = formataMoeda((event.target as HTMLInputElement).value);    
    });
    bonus_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('bonus_atual')).value = formataMoeda((event.target as HTMLInputElement).value); 
    });
    flash_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('flash_atual')).value = formataMoeda((event.target as HTMLInputElement).value);      
    });
    cesta_atual.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('cesta_atual')).value = formataMoeda((event.target as HTMLInputElement).value);   
    });
    remuneracao_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('remuneracao_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);   
    });
    va_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('va_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);     
    });
    vr_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('vr_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);     
    });
    bonus_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('bonus_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);   
    });
    flash_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('flash_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);    
    });
    cesta_pretensao.addEventListener('input', (event) =>{
      (<HTMLInputElement>document.getElementById('cesta_pretensao')).value = formataMoeda((event.target as HTMLInputElement).value);  
    })

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

  private getPlanoSaude() {
    this.planoService.getPlanoSaude().subscribe((lista) => {
      this.listaPlano = lista;
    });
  }

  private getPlanoSaudePretensao() {
    this.planoPretensaoService.getPlanoSaudePretensao().subscribe((lista) => {
      this.listaPlanoSaudePretensao = lista;
    });
  }
 

  private carregaUsuarios() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this. candidatoService.getCandidatosId(this.id).subscribe(
        (rh) => {
          this.candidato = rh;
          this.mostrarAtualizar= true;
          this.mostrarInserir = false;
          this.mostrarStatus = true;
        }
      );
    }
  }

  observacao(event: any){
  if(event.target.value !== 5 ){
    this.mostrarObservacao = true;
  }else{
    this.mostrarObservacao = false;
  };
  }
  submit() {
    if (this.form.invalid) {
      this.notifier.notify("error", " Todos os campos devem ser preenchidos corretamente!");
    }  else if(this.id){
        this.atualizaCandidatos();
      } else {
        this.insereCandidatos();
    }
  }

  private getStatusCandidato() {
    this.statusCandidatoService.getStatusCandidato().subscribe((lista) => {
      this.listaStatusCandidato = lista;
    });
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

  private insereCandidatos() {
    this.candidato.vagas = this.vagas;
    this.candidatoService.insereCandidatos(this.candidato).subscribe((data) => {
      if (data.status == 200) {
        this.notifier.notify("success", "CANDIDATO CADASTRADO COM SUCESSO!");
        this.router.navigate(['vagas']);
      }
      if (data.status == 500){
        this.notifier.notify("error", "ERRO AO CADASTRAR, CONFIRAR OS DADOS ");
      }
    });
  }

  private atualizaCandidatos() {
    this.candidatoService.atualizaCandidatos(this.candidato).subscribe((data) => {
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

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post(environment.api + 'upload', fd).subscribe(
      () => {
        this.notifier.notify("success",'Arquivo enviado com sucesso');
      },
      () => {
        this.notifier.notify("error", 'Erro ao enviar arquivo');
      }
    );
  }

 
  preencheCampos(){
    this.populaCampo('select-planoSaude', this.candidato.planoSaude);
    this.populaCampo('select-planoPretensao', this.candidato.planoPretensao);
    this.populaCampo('select-statusCandidato', this.candidato.status_candidato);
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
  volta(){
    this.router.navigate(['vagas/']);
  }


}