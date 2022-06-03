import { AgendamentoViewModel } from './../../models/AgendamentoViewModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendamentosService } from './../services/agendamentos.service';
import { Agendamento } from './../model/agendamento';
import { Observable, catchError, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
})
export class AgendamentosComponent implements OnInit {
  agendamentos$: Observable<AgendamentoViewModel[]>;
  displayedColumns = [
    'funcionario',
    'cliente',
    'data',
    'servico',
    'valor',
    'telefone',
    'actions',
  ];
  constructor(
    private agendamentoService: AgendamentosService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.agendamentos$ = this.agendamentoService.listarAgendamentos().pipe(
      catchError((error) => {
        console.log('Erro ao buscar Clientes', 'Fechar');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    
    this.router.navigate(['editar', id])
  }
  ngOnInit(): void {}
}
