import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog-vaga',
  template: `
    <h2 mat-dialog-title>ATENÇÃO</h2>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
    </div>
  `,
})
export class ErrorDialogVagaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}