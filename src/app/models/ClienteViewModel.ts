export class ClienteViewModel {

  id: number;
  cpf: string;
  dataNascimento: string;
  email: string;
  endereco: string;
  nome: number;
  sexo: string;
  telefone: string;



  constructor(cliente: any) {
    this.id = (cliente.id !== undefined) ? cliente.id : null;
    this.cpf = (cliente.cpf !== undefined) ? cliente.cpf : null;
    this.dataNascimento = (cliente.dataNascimento !== undefined) ? cliente.dataNascimento : null;
    this.endereco = (cliente.endereco !== undefined) ? cliente.endereco : null;
    this.nome = (cliente.nome !== undefined) ? cliente.nome : null;
    this.email = (cliente.email !== undefined) ? cliente.salario : null;
    this.sexo = (cliente.sexo !== undefined) ? cliente.sexo : null;
    this.telefone = (cliente.telefone !== undefined) ? cliente.telefone : null;
  }
}
