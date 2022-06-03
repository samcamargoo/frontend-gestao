import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: AgendamentosComponent},
  {path:'new', component: AgendamentosFormComponent},
  {path: 'editar/:id', component: AgendamentosFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
