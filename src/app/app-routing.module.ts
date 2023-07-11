import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './modules/usuario/usuarios/usuarios.component';
import { DefaultComponent } from './modules/pagina-inicial/default/default.component';
import { NovoUsuarioComponent } from './modules/usuario/novo-usuario/novo-usuario.component';
import { DetalhaUsuarioComponent } from './modules/usuario/detalha-usuario/detalha-usuario.component';
import { CargoComponent } from './modules/usuario/cargo/cargo.component';
import { ContratoComponent } from './modules/usuario/contrato/contrato.component';
import { RelatorioComponent } from './modules/usuario/relatorio/relatorio.component';
import { MaquinasComponent } from './modules/usuario/maquinas/maquinas.component';
import { DetalhesMaquinasComponent } from './modules/usuario/detalhes-maquinas/detalhes-maquinas.component';
import { AtualizarMaquinasComponent } from './modules/usuario/atualizar-maquinas/atualizar-maquinas.component';
import { PerfilComponent } from './modules/usuario/perfil/perfil.component';
import { VagasComponent } from './modules/rh/vaga/vagas.component';
import { CadastroVagasComponent } from './modules/rh/cadastro-vagas/cadastro-vagas.component';
import { DetalhesVagasComponent } from './modules/rh/detalhes-vagas/detalhes-vagas.component';
import { CadastroCandidatoComponent } from './modules/rh/cadastro-candidato/cadastro-candidato.component';
import { CandidatosComponent } from './modules/rh/candidatos/candidatos.component';
import { DetalhesCandidatosComponent } from './modules/rh/detalhes-candidatos/detalhes-candidatos.component';
import { CandidatosDisponivelComponent } from './modules/rh/candidatos/candidatosDisponivel/candidatos-disponivel/candidatos-disponivel.component';
import { LoginComponent } from './modules/login/login.component';
import { EsqueceuSenhaComponent } from './modules/login/esqueceu-senha/esqueceu-senha.component';
import { AuthGuardService } from './services/guards/AuthGuard/auth-guard.service';
import { PrimeiroAcessoComponent } from './modules/login/primeiro-acesso/primeiro-acesso.component';
import { HomeParentComponent } from './modules/pagina-inicial/home-parent/home-parent.component';
import { LoginGuardService } from './services/guards/AuthLogin/login-guard.service';
import { RedefinirSenhaComponent } from './modules/login/esqueceu-senha/redefinir-senha/redefinir-senha.component';
import { PropostaComponent } from './modules/rh/proposta/proposta.component';
import { AtualizarPropostaComponent } from './modules/rh/proposta/atualizar-proposta/atualizar-proposta.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate:[LoginGuardService]},
  {path: 'esqueceuSenha', component: EsqueceuSenhaComponent},
  {path: 'primeiroAcesso', component: PrimeiroAcessoComponent},
  {path: 'redefinirSenha/:token', component:RedefinirSenhaComponent},
  {path: '', component: HomeParentComponent ,canActivate:[AuthGuardService],
    children: [
      {path: 'home', component: DefaultComponent, canActivate:[AuthGuardService] },
      {path: 'usuarios', component: UsuariosComponent,canActivate:[AuthGuardService] },
      {path: 'usuarios/:id', component: DetalhaUsuarioComponent,canActivate:[AuthGuardService]},
      {path: 'novo-usuario/:id', component: NovoUsuarioComponent,canActivate:[AuthGuardService]},
      {path: 'novo-usuario', component: NovoUsuarioComponent,canActivate:[AuthGuardService]},
      {path: 'funcao', component:CargoComponent, canActivate:[AuthGuardService]},
      {path: 'contrato', component:ContratoComponent, canActivate:[AuthGuardService]},
      {path: 'relatorio', component:RelatorioComponent,canActivate:[AuthGuardService]},
      {path: 'detalhesMaquinas', component: DetalhesMaquinasComponent,canActivate:[AuthGuardService]},
      {path: 'detalhesMaquinas/:id',component: AtualizarMaquinasComponent,canActivate:[AuthGuardService]},
      {path: 'maquinas/:id', component: MaquinasComponent,canActivate:[AuthGuardService] },
      {path: 'maquinas', component:MaquinasComponent ,canActivate:[AuthGuardService]},
      {path: 'perfil', component: PerfilComponent,canActivate:[AuthGuardService]},
      {path: 'vagas', component: VagasComponent,canActivate:[AuthGuardService]},
      {path: 'vagas/:id', component: DetalhesVagasComponent, canActivate:[AuthGuardService]},
      {path: 'cadastro-vagas', component: CadastroVagasComponent, canActivate:[AuthGuardService]},
      {path: 'cadastro-vagas/:id', component: CadastroVagasComponent, canActivate:[AuthGuardService]},
      {path: 'cadastro-candidato', component: CadastroCandidatoComponent, canActivate:[AuthGuardService]},
      {path: 'cadastro-candidato/:id', component: CadastroCandidatoComponent, canActivate:[AuthGuardService]},
      {path: 'candidato/:id', component:DetalhesCandidatosComponent, canActivate:[AuthGuardService]},
      {path: 'candidato', component: CandidatosComponent, canActivate:[AuthGuardService]},
      {path: 'candidatodisponivel', component: CandidatosDisponivelComponent, canActivate:[AuthGuardService]},
      {path: 'proposta', component: PropostaComponent, canActivate:[AuthGuardService]},
      {path: 'propostas', component: AtualizarPropostaComponent, canActivate:[AuthGuardService]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
