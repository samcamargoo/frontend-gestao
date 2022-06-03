import { Servico } from './../../servicos/model/servico';
import { Funcionario } from './../../funcionarios/model/funcionario';
import { Cliente } from './../../clientes/model/cliente';

export interface Agendamento {
  horario: string,
  valorTotal: number,
  cliente: Cliente,
  funcionario: Funcionario
  servico: Servico
}
