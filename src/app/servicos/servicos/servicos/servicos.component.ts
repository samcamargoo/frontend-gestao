import { MessagesComponent } from './../../../messages/messages/messages.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Page } from './../../../models/Page';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../dialog/dialog.component';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from '../../model/servico';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  displayedColumns = ['nome', 'valor', 'actions'];
  dataSource!: MatTableDataSource<any>;
  page!: Page;
  totalElements: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: ServicoService,
    private messages: MessagesComponent
  ) {}

  ngOnInit(): void {
    this.getServicoPage(0, 10);
  }

  getServicoPage(page: number, size: number) {
    return this.service.getServicosPage(page, size).subscribe(
      (result) => {
        this.page = result;
        this.totalElements = result.totalElements;
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

    this.service.getServicosPage(pageIndex, pageSize).subscribe((result) => {
      this.dataSource = new MatTableDataSource(result.content);
    });
  }
  onError() {
    this.snackBar.open(this.messages.getServicoError, 'Fechar', {
      duration: 2000,
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'full-with-dialog',
    }).afterClosed().subscribe(value =>{
      if (value === 'saved') {
        this.getServicoPage(0, 10)
      }
    });
  }
}
