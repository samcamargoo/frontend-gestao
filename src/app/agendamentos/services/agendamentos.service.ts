import { Page } from 'src/app/models/Page';
import { AgendamentoViewModel } from './../../models/AgendamentoViewModel';
import { first, tap } from 'rxjs';
import { Agendamento } from './../model/agendamento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  private readonly API = 'https://gestao-api-app.herokuapp.com/api/v1/agendamentos';
  constructor(private httpClient: HttpClient) {}

  getAgendamentosUrl() {
    return this.API;
  }

  getAgendamentosPage(page: number, size: number) {
    return this.httpClient.get<Page>(this.API + `/?page=${page}&size=${size}`);
  }

  // listarAgendamentos() {
  //   return this.httpClient.get<AgendamentoViewModel[]>(this.API).pipe(
  //     first(),
  //     tap((agendamentos) => console.log(agendamentos))
  //   );
  // }

  salvarAgendamento(record: AgendamentoViewModel) {
    return this.httpClient.post<AgendamentoViewModel[]>(this.API, record).pipe(first());
  }

  calcularValorTotal(valor: number[]) {}
}
