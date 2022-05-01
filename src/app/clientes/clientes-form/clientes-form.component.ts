import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientesService } from './../services/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit {
  clicked = false;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private location: Location
   ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      sexo: [null, Validators.required]

    })
  }

  ngOnInit(): void {


  }

  onSubmit() {

    this.service.salvarCliente(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError())

  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open("Cliente cadastrado com sucesso", "Fechar", {duration: 2000});
    this.onCancel();
  }
  onError() {
    this.snackBar.open("Não foi possível salvar o cliente", "Fechar", {duration: 2000});
  }


}
