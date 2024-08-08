import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from '../../dashboard-Modules/User/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';



const routes :Routes = [
  {path:"",component:UserListComponent},
  {path:":id", component:UserProfileComponent},
]

@NgModule({
  declarations: [
    UserProfileComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,SharedModule,MatCardModule,  HttpClientModule
  ],
  exports:[
    UserProfileComponent,
    UserListComponent
  ]
})
export class UserModule { }
