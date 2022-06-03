import { FuncionarioViewModel } from './FuncionarioViewModel';
export interface Page  {
  content?: Array<any>; 
  last?: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
