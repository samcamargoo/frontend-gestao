import { MessagesComponent } from './../../messages/messages/messages.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Page } from 'src/app/models/Page';
import { MatTableDataSource } from '@angular/material/table';
import { AgendamentoViewModel } from './../../models/AgendamentoViewModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendamentosService } from './../services/agendamentos.service';
import { Agendamento } from './../model/agendamento';
import { Observable, catchError, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
})
export class AgendamentosComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  page!: Page;
  pageIndex: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
    private service: AgendamentosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private messages: MessagesComponent,
  ) {

   
  }

  getAgendamentosPage(page: number, size: number) {
    this.service.getAgendamentosPage(page, size).subscribe(
      (result) => {
        this.page = result;
        this.totalElements = result.totalElements
        this.dataSource = new MatTableDataSource(result.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => this.onError()
    );
  }

 

  onError() {
    this.snackBar.open(this.messages.getClientsError, 'Fechar', {
      duration: 2000,
    });
  }
  onEdit(id: number) {
    
    this.router.navigate(['editar', id])
  }
  ngOnInit(): void {}
}
