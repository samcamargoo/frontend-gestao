import { ServicosFormComponent } from './servicos/servicos-form/servicos-form.component';
import { ServicosComponent } from './servicos/servicos/servicos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ServicosComponent},
  {path: 'new', component: ServicosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
