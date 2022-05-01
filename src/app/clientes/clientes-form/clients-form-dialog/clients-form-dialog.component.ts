import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clients-form-dialog',
  templateUrl: './clients-form-dialog.component.html',
  styleUrls: ['./clients-form-dialog.component.scss']
})
export class ClientsFormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClientsFormDialogComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
