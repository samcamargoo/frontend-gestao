import { Page } from 'src/app/models/Page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap, distinctUntilChanged, Observable } from 'rxjs';
import { Funcionario } from '../model/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  private readonly API = 'http://gestao-api-app.herokuapp.com/v1/funcionarios';

  constructor(private httpClient: HttpClient) {}

  getApiUrl() {
    return this.API;
  }

  getFuncionariosList() {
    return this.httpClient.get<Funcionario[]>(this.API).pipe(
      first(),
      tap((funcionarios) => console.log(funcionarios))
    );
  }

  getFuncionariosPage(page: number, size: number) {
    return this.httpClient.get<Page>(this.API + `/?page=${page}&size=${size}`)

  }

  postFuncionario(record: Funcionario) {
    return this.httpClient.post<Funcionario>(this.API, record);
  }

  putFuncionario(record: any, id: number) {
    return this.httpClient.put<any>(this.API + '/' + id, record);
  }
  verificarCpf(cpf: string) {
    return this.httpClient.post<any>(this.API + '/verificar-cpf/' +cpf, cpf);
  }
}
