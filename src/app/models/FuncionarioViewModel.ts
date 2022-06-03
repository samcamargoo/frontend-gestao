export class FuncionarioViewModel {

  id: number;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  nome: string;
  salario: number;
  sexo: string;
  telefone: string;
  roles: string;


  constructor(funcionario: any) {
    this.id = (funcionario.id !== undefined) ? funcionario.id : null;
    this.cpf = (funcionario.cpf !== undefined) ? funcionario.cpf : null;
    this.dataNascimento = (funcionario.dataNascimento !== undefined) ? funcionario.dataNascimento : null;
    this.endereco = (funcionario.endereco !== undefined) ? funcionario.endereco : null;
    this.nome = (funcionario.nome !== undefined) ? funcionario.nome : null;
    this.salario = (funcionario.salario !== undefined) ? funcionario.salario : null;
    this.sexo = (funcionario.sexo !== undefined) ? funcionario.sexo : null;
    this.telefone = (funcionario.telefone !== undefined) ? funcionario.telefone : null;
    this.roles = (funcionario.roles !== undefined) ? funcionario.roles : null;
  }
}
