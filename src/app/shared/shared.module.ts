import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    MatSnackBarModule
  ],
  exports: [ErrorComponent]
})
export class SharedModule { }
