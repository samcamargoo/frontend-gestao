import { ErrorComponent } from './../../shared/components/error/error.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from './../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { catchError, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

 clientes$: Observable<Cliente[]>;
 displayedColumns = ['nome', 'telefone', 'sexo', 'actions'];

 //clientesService: ClientesService;


  constructor(private clientesService: ClientesService,
              public _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {

    //this.clientesService = new ClientesService();
    this.clientes$ = this.clientesService.listarClientes()
    .pipe(
      catchError(error => {
        this.onError('Erro ao buscar Clientes', 'Fechar')
        return of([])
      })
    );
  }

  onError(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  onAdd() {
   this.router.navigate(['new'], {relativeTo: this.route})
  }

  onDelete() {
    
  }

  ngOnInit(): void {
  }

}
