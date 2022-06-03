import { ServicoViewModel } from './../../models/ServicoViewModel';
import { first, tap } from 'rxjs';
import { Servico } from './../model/servico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private readonly API = 'https://gestao-api-app.herokuapp.com/api/v1/servicos';
  constructor(private httpClient: HttpClient) {}

  listarServicos() {
    return this.httpClient.get<Servico[]>(this.API).pipe(
      first(),
      tap((servicos) => console.log(servicos))
    );
  }

  salvarServico(record: ServicoViewModel) {
    return this.httpClient.post<ServicoViewModel[]>(this.API, record);

  }
}
