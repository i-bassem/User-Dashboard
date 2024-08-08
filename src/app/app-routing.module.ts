import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule,Routes }from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorsComponent } from './pages/errors/errors.component';



const routes:Routes=[
  {path:"home",component:HomeComponent},
  {
    path: 'User', loadChildren: () => import('src/app/dashboard-Modules/User/user.module')
                                         .then(m => m.UserModule)
  },
  {path:"", redirectTo:"/User", pathMatch:"full"},
  {path:"**", component:ErrorsComponent},
];

const routerOptions: ExtraOptions = {
  useHash:true,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes,routerOptions)
  ],
  exports:[
      RouterModule
  ]
})

export class AppRoutingModule { }
