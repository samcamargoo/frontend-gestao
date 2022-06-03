export class ServicoViewModel {

  id: number;
  nome: string;
  valor: number;



  constructor(servico: any) {
    this.id = (servico.id !== undefined) ? servico.id : null;
    this.nome = (servico.nome !== undefined) ? servico.nome : null;
    this.valor = (servico.valor !== undefined) ? servico.valor : null;

  }
}
