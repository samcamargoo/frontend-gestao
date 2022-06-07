import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicosComponent } from './servicos/servicos/servicos.component';
import { ServicosFormComponent } from './servicos/servicos-form/servicos-form.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    ServicosComponent,
    ServicosFormComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ServicosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ServicosModule { }
