import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeParentComponent } from './home-parent/home-parent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DefaultComponent } from './default/default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeParentComponent, NavbarComponent, DefaultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  entryComponents: []
})
export class PaginaInicialModule { }
