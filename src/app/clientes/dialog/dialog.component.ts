import { MessagesComponent } from './../../messages/messages/messages.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  actionBtn: string = 'Cadastrar';

  // msgAddClientSuccess: string = 'Cliente cadastrado com sucesso';
  // msgAddClientError: string = 'Erro ao cadastraro cliente';

  // msgEditClientSuccess: string = 'Cliente editado com sucesso';
  // msgEditClientError: string = 'Erro ao editar cliente';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private messages: MessagesComponent
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      sexo: [null, Validators.required],


    });

    if (this.editData) {
      this.actionBtn = 'Editar';
      this.form.patchValue(this.editData);
    }
  }

  addClient() {
    if (!this.editData) {
      this.clienteService.postClient(this.form.value).subscribe(
       result => {
         this.onSuccess();
         this.dialog.close('saved')
       },
       error => this.onError()

      );
    } else {
      this.editClient();
    }
  }

  editClient() {
    this.clienteService.putClient(this.form.value, this.editData.id).subscribe(result => {
      this.onSuccess();
      this.form.reset();
      this.dialog.close('updated')
    },
     error =>  this.onError()
    );
  }
  onError() {
    if(!this.editData) {
      this.snackBar.open(this.messages.postClientError, 'Fechar', {
        duration: 2000,
      });
    } else {
      this.snackBar.open(this.messages.putClientError, 'Fechar', {
        duration: 2000,
      });
    }

  }
  onSuccess() {
    if (!this.editData) {
      this.snackBar.open(this.messages.postClientSuccess, 'Fechar', {
        duration: 2000,
      });
      this.form.reset();
      this.dialog.close();
    } else {
      this.snackBar.open(this.messages.putClientSuccess, 'Fechar', {
        duration: 2000,
      });
    }
  }
}
