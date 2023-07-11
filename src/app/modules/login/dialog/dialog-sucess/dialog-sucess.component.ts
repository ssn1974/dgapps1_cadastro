import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-sucess',
  templateUrl: './dialog-sucess.component.html',
  styleUrls: ['./dialog-sucess.component.css']
})
export class DialogSucessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSucessComponent>) { }

  ngOnInit() {
  }
  cancelar(): void {
    this.dialogRef.close();
  }

}
