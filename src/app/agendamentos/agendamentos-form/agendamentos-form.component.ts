import { AgendamentoViewModel } from './../../models/AgendamentoViewModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';

import { Cliente } from './../../clientes/model/cliente';
import { ClientesService } from './../../clientes/services/clientes.service';
import { FuncionariosService } from './../../funcionarios/services/funcionarios.service';
import { ServicoService } from './../../servicos/services/servico.service';
import { AgendamentoClass } from './../model/agendamentoClass';
import { AgendamentosService } from './../services/agendamentos.service';
import { FuncionarioViewModel } from 'src/app/models/FuncionarioViewModel';
import { Location } from '@angular/common';
@Component({
  selector: 'app-agendamentos-form',
  templateUrl: './agendamentos-form.component.html',
  styleUrls: ['./agendamentos-form.component.scss'],
})
export class AgendamentosFormComponent implements OnInit {
  form: FormGroup;
  myControl = new FormControl();
  options: string[] = [];
  cliente: string = '';
  funcionarioId: number = 0;
  servicoId: number = 0;
  servicoValor: number[] = [];
  dataHorario: string = '';
  clienteId: number = 0;

  funcionariosSelecionado = new FuncionarioViewModel({});
  funcionarios1: FuncionarioViewModel[] = [];
  filteredOptions: Observable<Cliente[]>;
  funcionarios: any = [];
  servicos: any = [];
  clientes: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionariosService,
    private agendamentoService: AgendamentosService,
    private clienteService: ClientesService,
    private ServicoService: ServicoService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    console.log(this.funcionarios1);
    this.form = this.formBuilder.group({
      cliente: this.formBuilder.group({
        nome: this.myControl,
        id: this.clienteId,
      }),
      funcionario: this.formBuilder.group({
        id: this.funcionariosSelecionado,
      }),
      servico: this.formBuilder.group({
        id: this.servicoId,
      }),
      data: [this.dataHorario, Validators.required],
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => value.trim()),
      debounceTime(200),
      filter((value) => value.length > 3),
      distinctUntilChanged(),
      switchMap((value) => this.filter(value))
    );
  }

  ngOnInit() {
    //salva lista de funcionarios em um array[]
    this.funcionarioService.getFuncionariosList().subscribe((data) => {
      for (let dados of data) {
        this.funcionarios.push({ id: dados.id, nome: dados.nome });
      }
      console.log(this.funcionarios1);
    });

    //salva lista de serviços em um array[]
    this.ServicoService.getServicosList().subscribe((data) => {
      for (let dados of data) {
        this.servicos.push({
          id: dados.id,
          nome: dados.nome,
          valor: dados.valor,
        });
      }
    });

    //salva lista de clientes em um array[]
    this.clienteService.getClientsList().subscribe((data) => {
      for (let dados of data) {
        this.clientes.push({
          id: dados.id,
          nome: dados.nome,
        });
      }
    });
  }

  converterData(data: string) {
    return (this.dataHorario = moment(data).format('DD/MM/yyyy'));
  }
  atualizarValor(id: number) {
    for (let i = 0; i < this.servicos.length; i++) {
      if (id - 1 == i) {
        this.servicoValor = this.servicos[i].valor;
      }
    }
  }
  atualizarData(data: string) {
    this.converterData(data);
    console.log(this.form.get('data'));
  }
  atualizarFuncionarioId() {
    this.funcionarioId = this.funcionarioId;
  }
  atribuirValoresAoForm() {
    this.form.get('funcionario.id')?.setValue(this.funcionarioId);
    this.form.get('cliente.id')?.setValue(this.clienteId);
    this.form.get('servico.id')?.setValue(this.servicoId);
    this.form.get('data')?.setValue(this.dataHorario);
  }
  onSubmit() {
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].nome === this.cliente) {
        this.clienteId = this.clientes[i].id;
      }
    }

    this.atribuirValoresAoForm();
    this.agendamentoService
      .salvarAgendamento(new AgendamentoViewModel(this.form.value))
      .subscribe(
        (result) => this.onSuccess(),
        (error) => this.onError()
      );
    this.onCancel();
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Agendamento criado com sucesso', 'Fechar', {
      duration: 2000,
    });
  }
  onError() {
    this.snackBar.open('Erro ao salvar agendamento', 'Fechar', {
      duration: 2000,
    });
  }
  filter(value: string) {
    return this.clienteService
      .getClientsList()
      .pipe(
        map((response) =>
          response.filter(
            (cliente) => cliente.nome.toLowerCase().includes(value),
            console.log('cliente é: ' + this.cliente)
          )
        )
      );
  }
}
