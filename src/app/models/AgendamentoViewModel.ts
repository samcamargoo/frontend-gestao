import { ServicoViewModel } from './ServicoViewModel';
import { FuncionarioViewModel } from 'src/app/models/FuncionarioViewModel';
import { ClienteViewModel } from './ClienteViewModel';
export class AgendamentoViewModel {
  id: number;
  data: string;
  horario: string;
  valorTotal: number;
  cliente: ClienteViewModel;
  funcionario: FuncionarioViewModel;
  servico: ServicoViewModel;

  constructor(agendamento: any) {
    this.id = agendamento.id !== undefined ? agendamento.id : null;
    this.data =
      agendamento.data !== undefined ? agendamento.data : null;
    this.horario =
      agendamento.horario !== undefined ? agendamento.horario : null;
    this.valorTotal =
      agendamento.valorTotal !== undefined ? agendamento.valorTotal : null;
    this.cliente =
      agendamento.cliente !== undefined ? agendamento.cliente : null;
    this.funcionario =
      agendamento.funcionario !== undefined ? agendamento.funcionario : null;
    this.servico =
      agendamento.servico !== undefined ? agendamento.servico : null;
  }
}
