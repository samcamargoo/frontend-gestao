import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosComponent } from './funcionarios/funcionarios/funcionarios.component';

const routes: Routes = [
  {path: '', pathMatch: 'full',  redirectTo: 'home'},
  {path: 'new', component: ClientesFormComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'clientes',
  loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
