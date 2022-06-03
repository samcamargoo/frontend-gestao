import { Cliente } from './../../../clientes/model/cliente';
import { debounceTime, distinctUntilChanged, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { ServicoService } from './../../../servicos/services/servico.service';
import * as moment from 'moment';
import { ClientesService } from './../../../clientes/services/clientes.service';
import { FuncionariosService } from './../../../funcionarios/services/funcionarios.service';
import { FuncionarioViewModel } from 'src/app/models/FuncionarioViewModel';
import { MessagesComponent } from './../../../messages/messages/messages.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendamentosService } from './../../services/agendamentos.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AgendamentoViewModel } from 'src/app/models/AgendamentoViewModel';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  actionBtn: string = 'Agendar';
  myControl = new FormControl();
  cliente: string = '';
  funcionarioId: number = 0;
  servicoId: number = 0;
  servicoValor: number[] = [];
  dataHorario: string = '';
  clienteId: number = 0;
  funcionarios: any = [];
  funcionariosSelecionado = new FuncionarioViewModel({});
  servicos: any = [];
  clientes: any = [];
  filteredOptions: Observable<Cliente[]>;

  constructor( private formBuilder: FormBuilder,
    private service: AgendamentosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<DialogComponent>,
    private funcionarioService: FuncionariosService,
    private agendamentoService: AgendamentosService,
    private clienteService: ClientesService,
    private servicoService: ServicoService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private messages: MessagesComponent) { 

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => value.trim()),
        debounceTime(200),
        filter((value) => value.length > 3),
        distinctUntilChanged(),
        switchMap((value) => this.filter(value))
      );
    }

  ngOnInit(){

    this.funcionarioService
    .getFuncionariosList()
    .subscribe((data) => {
      
      data.forEach(dados => {
        this.funcionarios.push({
          id: dados.id,
          nome: dados.nome
        });
      }) 
      
    });

    this.servicoService.getServicosList().subscribe((data) => {
      for (let dados of data) {
        this.servicos.push({
          id: dados.id,
          nome: dados.nome,
          valor: dados.valor,
        });
      }
    });

    this.clienteService.getClientsList().subscribe((data) => {
      
      data.forEach(dados => {
        this.clientes.push({id: dados.id,
        nome: dados.nome})
      })
    });

    this.form = this.formBuilder.group({
     cliente:  this.formBuilder.group({
      nome: this.myControl,
      id: this.clienteId,
    }),
      funcionario: this.formBuilder.group({
        id: this.funcionariosSelecionado,
      }),
      servico: this.formBuilder.group({
        id: this.servicoId,
      }),
      data: [this.dataHorario, Validators.required]
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
    console.log(this.form.get('data'))
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
    //this.onCancel();
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
