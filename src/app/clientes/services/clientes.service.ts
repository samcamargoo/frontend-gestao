import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'http://localhost:8080/api/v1/clientes';

  constructor(private httpClient: HttpClient) { }

  listarClientes(){
    return this.httpClient.get<Cliente[]>(this.API)
    .pipe(
      first(),
      tap(clientes => console.log(clientes))
    );
  }

  salvarCliente(record: Cliente) {
    return this.httpClient.post<Cliente>(this.API, record).pipe(first());
  }

  deletarCliente(record: Cliente) {
    return this.httpClient.delete<Cliente>(this.API)
  }

}
