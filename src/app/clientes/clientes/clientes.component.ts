import { Page } from 'src/app/models/Page';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MessagesComponent } from './../../messages/messages/messages.component';
import { DialogComponent } from './../dialog/dialog.component';
import { ClientesService } from './../services/clientes.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'telefone', 'sexo', 'actions'];
  dataSource!: MatTableDataSource<any>;
  page!: Page;
  pageIndex: number = 0;

  clientes: Array<Cliente> = []
  pageSize: number = 10;
  totalElements: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private messages: MessagesComponent,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'saved') {
          this.getClientsPage(0, 10)

        }
      });
  }

  // getAllClients() {
  //   this.service.getClientsList().subscribe(
  //     (result) => {
        // this.dataSource = new MatTableDataSource(result);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
  //     },
  //     (error) => this.onError()
  //   );
  // }

  getClientsPage(page: number, size: number) {
    this.service.getClientsPage(page, size).subscribe(
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

  setPage(event: PageEvent) {
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    console.log(this.pageIndex)
    this.service
      .getClientsPage(pageIndex, pageSize)
      .subscribe((result) => {
        this.dataSource = new MatTableDataSource(result.content);
      });
  }
  editClient(cliente: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: cliente,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'updated') {
          // this.getAllClients();
        }
      });
  }

  deleteClient(id: number) {
    this.service.deleteClient(id).subscribe(
      (result) => {
        this.snackBar.open('Cliente deletado com sucesso', 'Fechar', {
          duration: 2000,
        });
        this.getClientsPage(0, 10)
      },
      (error) =>
        this.snackBar.open('Erro ao deletar Cliente', 'Fechar', {
          duration: 2000,
        })
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.filter.length == 0 && this.dataSource.paginator) {
      this.dataSource._updatePaginator(this.totalElements)
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
    }
  }

  ngOnInit() {
    // this.getAllClients();
    this.getClientsPage(0, 10)

  }

  onError() {
    this.snackBar.open(this.messages.getClientsError, 'Fechar', {
      duration: 2000,
    });
  }
}
