import { BrowserModule } from '@angular/platform-browser';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './components/guard/authguard';
import {AauthGuard} from './components/guard/aauthguard';
import {ValidateService} from './services/validate.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';

import {AboutComponent} from './components/about/about.component';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { TheatreComponent } from './components/theatre/theatre.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import { MovieFilterPipe} from './filters/moviefilter';
import {MovieService} from './services/movie.service';
import {AuthService} from './services/auth.service'
const appRoutes:Routes =[
  {path:'',component: LandingComponent},
  {path:'theatre/:moviename',component: TheatreComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  // {path:'adminregister',component:AdminregisterComponent},
  {path:'adminlogin',component:AdminloginComponent},
  { path: 'about', component: AboutComponent ,canActivate:[AuthGuard]},
   ]


@NgModule({
  declarations: [
    LoginComponent ,
    AdminloginComponent,
    AboutComponent,
    AppComponent,
    LandingComponent,
    NavbarComponent,
    RegisterComponent,
    TheatreComponent,
    MovieFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule,
      RouterModule.forRoot(appRoutes),
      FlashMessagesModule.forRoot()
  ],
  providers: [MovieService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
