import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  getClientsError: string = 'Erro ao carregar clientes';
  postClientError: string = 'Erro ao cadastrar cliente';
  putClientError: string = 'Erro ao atualizar cliente';
  deleteClientError: string = 'Erro ao deletar cliente';

  postClientSuccess: string = 'Cliente cadastrado com sucesso';
  putClientSuccess: string = 'Cliente editado com sucesso';
  deleteClientSuccess: string = 'Cliente deletado com sucesso';

  getFuncionariosError: string = 'Erro ao carregar funcionários';
  postFuncionarioError: string = 'Erro ao cadastrar funcionário';
  putFuncionarioError: string = 'Erro ao atualizar funcionário';
  deleteFuncionarioError: string = 'Erro ao deletar funcionário';

  postFuncionarioSuccess: string = 'Funcionário cadastrado com sucesso';
  putFuncionarioSuccess: string = 'Funcionário atualizado com sucesso';
  deleteFuncionarioSuccess: string = 'Funcionário deletado com sucesso';

  getServicoError: string = "Erro ao carregar serviços"
  postServicoError: string = 'Erro ao cadastrar serviço';

  postServicoSuccess: string = 'Serviço cadastrado com sucesso';

  cpfAlreadyInUse: string = 'Cpf cadastrado para outro funcionário';
  constructor() { }

  ngOnInit(): void {
  }

}
