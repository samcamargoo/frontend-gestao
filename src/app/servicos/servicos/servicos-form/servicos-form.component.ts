import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ServicoService } from './../../services/servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos-form',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['./servicos-form.component.scss'],
})
export class ServicosFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      valor: [null, [Validators.required, Validators.pattern('\\-?\\d*\\,?\\d{1,2}')]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.servicoService.salvarServico(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onError() {
    this.snackBar.open('Erro ao cadastrar Serviço', 'Fechar', {duration: 2000});
  }
  onSuccess() {
    this.snackBar.open('Serviço cadastrado com sucesso', 'Fechar', {duration: 2000});
  }
  onCancel() {
    this.location.back();
  }
}
