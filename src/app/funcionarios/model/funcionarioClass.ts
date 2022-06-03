import { FuncionarioRoles } from './funcionario-roles.enum';
export class FuncionarioClass {
  id!: number;
  nome!: string;
  cpf!: string;
  telefone!: string;
  endereco!: string;
  dataNascimento!: string;
  sexo!: string;
  salario!: number;
  dataCadastro!: string;
  roles!: FuncionarioRoles

}
