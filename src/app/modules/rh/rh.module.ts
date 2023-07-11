import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { VagasComponent } from './vaga/vagas.component';
import { CadastroVagasComponent } from './cadastro-vagas/cadastro-vagas.component';
import { DetalhesVagasComponent } from './detalhes-vagas/detalhes-vagas.component';
import { Cpf1Pipe } from 'src/pipe/cpf1.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { CadastroCandidatoComponent } from './cadastro-candidato/cadastro-candidato.component';
import { DetalhesCandidatosComponent } from './detalhes-candidatos/detalhes-candidatos.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidatosDisponivelComponent } from './candidatos/candidatosDisponivel/candidatos-disponivel/candidatos-disponivel.component';
import { DialogComponent } from './dialog/dialog.component';
import { PropostaComponent } from './proposta/proposta.component';
import { ErrorDialogComponent } from './dialog/ErrorDialogComponent/erroDialog.component';
import { ErrorDialogVagaComponent } from './dialog/ErroDialogVaga/ErroDialogVaga.component';
import { ErrorDialogPropostaComponent } from './dialog/ErroDialogProposta/erroDialogProposta.component';
import { AtualizarPropostaComponent } from './proposta/atualizar-proposta/atualizar-proposta.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    VagasComponent,
    CadastroVagasComponent,
    DetalhesVagasComponent,
    Cpf1Pipe,
    CadastroCandidatoComponent,
    DetalhesCandidatosComponent,
    CandidatosComponent,
    CandidatosDisponivelComponent,
    ErrorDialogComponent,
    ErrorDialogVagaComponent,
    ErrorDialogPropostaComponent,
    ErrorDialogComponent,
    DialogComponent,
    PropostaComponent,
    AtualizarPropostaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    NgxPrintModule,
    HttpClientModule,
    MatDialogModule,
    NgxMaskModule.forRoot(options),
    BrowserModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [DialogComponent, ErrorDialogComponent, ErrorDialogVagaComponent, ErrorDialogPropostaComponent, ErrorDialogComponent],
})

export class RhModule { }