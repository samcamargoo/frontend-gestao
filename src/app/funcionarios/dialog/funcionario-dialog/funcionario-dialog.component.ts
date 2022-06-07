import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, filter, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { MessagesComponent } from './../../../messages/messages/messages.component';
import { FuncionariosService } from './../../services/funcionarios.service';

@Component({
  selector: 'app-funcionario-dialog',
  templateUrl: './funcionario-dialog.component.html',
  styleUrls: ['./funcionario-dialog.component.scss'],
})
export class FuncionarioDialogComponent implements OnInit {
  form!: FormGroup;
  titulo: string = 'Cadastro de Funcionário';
  actionBtn: string = 'Cadastrar';
  cpf: string = '';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: FuncionariosService,
    private snackBar: MatSnackBar,
    private message: MessagesComponent,
    private dialog: MatDialogRef<FuncionarioDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
      cpf: [null, Validators.required],
      sexo: [null, Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Editar';
      this.titulo = 'Editar Funcionário';
      this.form.get('cpf')?.disable();
      this.form.getRawValue();
      this.form.patchValue(this.editData);
      console.log(this.form.get('cpf').value);
      console.log(this.form.getRawValue());
      

    }
  }

  addFuncionario() {
    if (!this.editData) {
      this.service.postFuncionario(this.form.value).subscribe(
        (result) => {
          this.onSuccess(this.message.postFuncionarioSuccess, 'Fechar');
          this.dialog.close('saved');
        },
        (error) => this.onError(this.message.postFuncionarioError, 'Fechar')
      );
    } else {
      this.editFuncionario();
    }
  }

  editFuncionario() {

    this.service.putFuncionario(this.form.value, this.editData.id).subscribe(
      (result) => {
        this.onSuccess(this.message.putFuncionarioSuccess, 'Fechar');
        this.form.reset();
        this.dialog.close('updated');

      },
      (error) => this.onError(this.message.putFuncionarioError, 'Fechar')
    );
  }

  verificarCpf(cpf: string) {
    if (cpf.length == 14) {
      this.service.verificarCpf(cpf).subscribe(
        (result) => console.log(result),
        (error) => {
          if (error.error) {
            this.onError(this.message.cpfAlreadyInUse, 'Fechar');
            //this.form.get('cpf')?.reset();
          }
        }
      );
    }
  }

  onError(msg: string, fechar: string) {
    this.snackBar.open(msg, fechar, { duration: 2000 });
  }

  onSuccess(msg: string, fechar: string) {
    this.snackBar.open(msg, fechar, { duration: 2000 });
  }
}
