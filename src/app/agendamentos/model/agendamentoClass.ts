import { ClienteClass } from './../../clientes/model/clienteClass';
import { FuncionarioClass } from './../../funcionarios/model/funcionarioClass';
import { ServicoClass } from './../../servicos/model/servicoClass';
export class AgendamentoClass {

  horario!: string;
  valorTotal!: number;
  cliente!: ClienteClass;
  funcionario!: FuncionarioClass;
  servico!: ServicoClass;
}
