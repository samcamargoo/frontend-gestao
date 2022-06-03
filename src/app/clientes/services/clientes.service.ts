import { ClienteViewModel } from './../../models/ClienteViewModel';
import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, take, tap, Observable } from 'rxjs';
import { Page } from 'src/app/models/Page';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://gestao-api-app.herokuapp.com/api/v1/clientes';

  constructor(private httpClient: HttpClient) {}

  getClientsPage(page: number, size: number) {
     return this.httpClient.get<Page>(this.API + `/?page=${page}&size=${size}`);
   }

  getClientsList() {
    return this.httpClient.get<Cliente[]>(this.API).pipe(first(), tap());
  }

  // getClientsPage(page: number, size: number) {
  //   return this.httpClient.get<Page>(this.API + `?page=${page}&size=${size}`).pipe(first(), tap());
  // }
  postClient(record: ClienteViewModel) {
    return this.httpClient.post<ClienteViewModel>(this.API, record).pipe(first());
  }

  putClient(record: any, id: number) {
    return this.httpClient.put<any>(this.API + '/' + id, record)
  }

  deleteClient(id: number) {
    return this.httpClient.delete<ClienteViewModel>(this.API + '/' + id)
  }
  carregarPorId(id: number) {
    return this.httpClient.get<ClienteViewModel>(`${this.API}/${id}`).pipe(
      take(1)
    )
  }
}
