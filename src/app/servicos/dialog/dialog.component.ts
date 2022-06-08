import { MessagesComponent } from './../../messages/messages/messages.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ServicoService } from '../services/servico.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionBtn: string = 'Cadastrar';
  form!: FormGroup;
  titulo: string = 'Cadastro de Serviços';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: ServicoService,
    private snackBar: MatSnackBar,
    private messages: MessagesComponent,
    private dialog: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      valor: [null, Validators.required],
    });
  }

  addService() {
    if (!this.editData) {
      this.service.postServico(this.form.value).subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
      this.dialog.close('saved');
    }
  }


  onSuccess() {
    this.snackBar.open(this.messages.postServicoSuccess, 'Fechar', {
      duration: 2000,
    });
  }

  onError() {
    this.snackBar.open(this.messages.postServicoError, 'Fechar', {
      duration: 2000,
    });
  }
}
