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
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalhaUsuarioComponent } from './detalha-usuario/detalha-usuario.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CpfPipe } from '../../../pipe/cpf.pipe';
import { MatGridListModule } from '@angular/material';
import { CargoComponent } from './cargo/cargo.component';
import { MatIconModule } from '@angular/material/icon';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ContratoComponent } from './contrato/contrato.component';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientModule } from '@angular/common/http';
import { MaquinasComponent } from './maquinas/maquinas.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DetalhesMaquinasComponent } from './detalhes-maquinas/detalhes-maquinas.component';
import { AtualizarMaquinasComponent } from './atualizar-maquinas/atualizar-maquinas.component';
import { PerfilComponent } from './perfil/perfil.component'
import { CepPipe } from 'src/pipe/cep.pipe';
import { LoginComponent } from '../login/login.component';
import { EsqueceuSenhaComponent } from '../login/esqueceu-senha/esqueceu-senha.component';
import { PrimeiroAcessoComponent } from '../login/primeiro-acesso/primeiro-acesso.component';
import { RedefinirSenhaComponent } from '../login/esqueceu-senha/redefinir-senha/redefinir-senha.component';
import { DialogComponent } from '../login/dialog/dialog.component';
import { DialogSucessComponent } from '../login/dialog/dialog-sucess/dialog-sucess.component';




export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    LoginComponent,
    EsqueceuSenhaComponent,
    NovoUsuarioComponent, 
    PrimeiroAcessoComponent,
    UsuariosComponent, 
    DetalhaUsuarioComponent, 
    CargoComponent,
    ContratoComponent, 
    RelatorioComponent, 
    MaquinasComponent,
    DetalhesMaquinasComponent,
    AtualizarMaquinasComponent,
    PerfilComponent, 
    CpfPipe,
    CepPipe,
    RedefinirSenhaComponent,
    DialogComponent,
    DialogSucessComponent,

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
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NgbModule,
    NgxPrintModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options),
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [DialogComponent,DialogSucessComponent],
})

export class UsuarioModule { }
