import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//material components
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
//modules for app
import { AppComponent } from './app.component';
// import { ChatboxComponent } from './chatbox/chatbox.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {LoggedInAuthGaurd} from './gaurds/logged-in.authgaurd';
import {NotLoggedInAuthGaurd} from './gaurds/not-logged-in.authgaurd';
import {UserLoggedInService} from './services/user-logged-in.service';
import {URLService} from './services/url.service';
import { SupportComponent } from './support/support.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminComponent } from './admin/admin.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LogoutComponent} from './logout/logout.component';
import {DummyComponent} from './dummy_component/dummy.component';
import {ChatLogsComponent} from './chat-logs/chat-logs.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {Chatbox2Component} from './chatbox2/chatbox2.component';


//directives
import {ClickOutsideDirective} from './click-outside.directive';

import {DemoComponent} from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    // ChatboxComponent,
    LoginComponent,
    WelcomeComponent,
    SupportComponent,
    FeedbackComponent,
    AdminComponent,
    NavbarComponent,
    LogoutComponent,
    DummyComponent,
    ChatLogsComponent,
    ClickOutsideDirective,
    PageNotFoundComponent,
    DemoComponent,
    Chatbox2Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [LoggedInAuthGaurd,NotLoggedInAuthGaurd,UserLoggedInService,URLService],
  bootstrap: [AppComponent]
})
export class AppModule { }
