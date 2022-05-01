import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientsFormDialogComponent } from './clientes-form/clients-form-dialog/clients-form-dialog.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ClientesFormComponent,
    ClientsFormDialogComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class ClientesModule { }
