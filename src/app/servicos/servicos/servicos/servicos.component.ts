import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../dialog/dialog.component';


import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../../model/servico';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {

  servicos$: Observable<Servico[]>;
  displayedColumns =  ['nome', 'valor', 'actions'];
  constructor(private servicoService: ServicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {
    this.servicos$ = this.servicoService.getServicosList().pipe(
      catchError((error) => {
        this.onError();
        return of([]);
      })
    );
   }


  ngOnInit(): void {
  }

  onError() {
    this.snackBar.open('Erro ao buscar Serviços', 'Fechar', {duration: 2000})
  }
  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'full-with-dialog'
    })
  }
}
