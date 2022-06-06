import { MessagesComponent } from './../../messages/messages/messages.component';
import { FuncionarioViewModel } from './../../models/FuncionarioViewModel';
import { ClienteViewModel } from './../../models/ClienteViewModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Page } from 'src/app/models/Page';

import { FuncionariosService } from '../services/funcionarios.service';
import { FuncionarioDialogComponent } from './../dialog/funcionario-dialog/funcionario-dialog.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss'],
})
export class FuncionariosComponent implements OnInit {
  displayedColumns = ['nome', 'cpf', 'telefone', 'endereco', 'actions'];
  dataSource!: MatTableDataSource<Page>;
  page!: Page;
  totalElements: number = 0;
  funcionarios: any[] = [];
  rows = new Array<FuncionarioViewModel>();
  pageNumber: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: FuncionariosService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private messages: MessagesComponent
  ) {

  }

  editFuncionario(funcionario: any) {
    this.dialog
      .open(FuncionarioDialogComponent, {
        panelClass: 'full-with-dialog',
        data: funcionario,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'updated') {
          this.getFuncionariosPage(0,10);
        }
      });
  }

  deleteFuncionario(id: number) {
    this.service.deleteFuncionario(id).subscribe(result => this._snackBar.open(this.messages.deleteFuncionarioSuccess, 'Fechar'), error => this._snackBar.open(this.messages.deleteFuncionarioError, 'Fechar'))
  }
  onError(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialog() {
    this.dialog
      .open(FuncionarioDialogComponent, {
        panelClass: 'full-with-dialog'
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'saved') {
          // this.getAllFuncionarios();
        }
      });
  }

  ngOnInit() {
    this.getFuncionariosPage(0, this.pageSize);
  }
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
    //this.totalElements = this.page.totalElements;
  }

  setPage(event: PageEvent) {
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    this.service
      .getFuncionariosPage(pageIndex, pageSize)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result.content);
      });
  }

  getFuncionariosPage(page: number, size: number) {
    this.service.getFuncionariosPage(page, size).subscribe((result) => {
      this.page = result;
      this.totalElements = result.totalElements;
      this.pageSize = result.size;
      this.dataSource = new MatTableDataSource(result.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.filter.length == 0 && this.dataSource.paginator) {
      this.dataSource._updatePaginator(this.totalElements)
    }
     if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
     }
  }
}
