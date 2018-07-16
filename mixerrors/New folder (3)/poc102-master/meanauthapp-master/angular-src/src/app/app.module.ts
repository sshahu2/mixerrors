import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { Dashboard1Component } from './components/dashboard-1/dashboard-1.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AgmCoreModule } from '@agm/core';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'dashboard_1', component: Dashboard1Component, canActivate:[AuthGuard,UserGuard]},
  {path:'payment', component: PaymentComponent, canActivate:[AuthGuard]},
  {path:'landing', component: LandingComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    Dashboard1Component,
    PaymentComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzcEI27D-EtLxxrtVaIB8qikgDG7w5cjY'  
      })
  ],
  providers: [ValidateService, AuthService, AuthGuard,AdminGuard,UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
