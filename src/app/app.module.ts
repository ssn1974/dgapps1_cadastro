import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PaginaInicialModule } from './modules/pagina-inicial/pagina-inicial.module';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { RhModule } from './modules/rh/rh.module';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {CurrencyPipe} from '@angular/common';
import { RouterModule } from '@angular/router';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [   
    BrowserModule,
    AppRoutingModule ,
    UsuarioModule,
    PaginaInicialModule,
    HttpClientModule,  
    RhModule, 
    NgSelectModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NotifierModule.withConfig({
      behaviour:{
        autoHide: 2000
      },
      position: {
        horizontal: {
          position: 'right'
        },
        vertical: {
          position: 'top'
        }
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [ CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
