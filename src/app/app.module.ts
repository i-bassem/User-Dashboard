import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './Spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { CommonModule } from '@angular/common';
import { DashboardModulesModule } from './dashboard-Modules/dashboard.module';
import { ErrorsComponent } from './pages/errors/errors.component';




@NgModule({
  declarations: [
    AppComponent, HomeComponent,SpinnerComponent,ErrorsComponent
  ],
  imports: [
    BrowserModule, FormsModule, CoreModule, SharedModule,AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModulesModule, CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
