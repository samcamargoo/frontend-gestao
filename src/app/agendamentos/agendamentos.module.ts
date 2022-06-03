import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DialogComponent } from './dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    AgendamentosComponent,
    AgendamentosFormComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    MatDatepickerModule
  ],
  providers: [
    DatePipe
  ]
})
export class AgendamentosModule { }
