import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,MatCheckboxModule,MatSliderModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class SharedModule { }
