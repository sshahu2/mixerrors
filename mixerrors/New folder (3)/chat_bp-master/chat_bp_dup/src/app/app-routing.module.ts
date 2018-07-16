import { RouterModule, Routes,CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
// import {ChatboxComponent} from './chatbox/chatbox.component';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoggedInAuthGaurd} from './gaurds/logged-in.authgaurd';
import {NotLoggedInAuthGaurd} from './gaurds/not-logged-in.authgaurd';
import {AdminComponent} from './admin/admin.component';
import {LogoutComponent} from './logout/logout.component';
import {DummyComponent} from './dummy_component/dummy.component';
import {ChatLogsComponent} from './chat-logs/chat-logs.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DemoComponent} from './demo/demo.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {Chatbox2Component} from './chatbox2/chatbox2.component';

const appRoutes: Routes = [
    {
      path: '',
      canActivate:[NotLoggedInAuthGaurd],
      component: WelcomeComponent // Default Route
    },
    // { 
    //   path: 'chatbox', 
    //   canActivate:[LoggedInAuthGaurd],
    //   component: ChatboxComponent 
    // },
    { 
      path: 'welcome', 
    canActivate:[LoggedInAuthGaurd],
      component: WelcomeComponent 
    },
    {
      path:'admin',
      component:AdminComponent
    },
    {
      path:'logout',
      component:LogoutComponent
    },
    {
      path:'dummy',
      component:DummyComponent,
    },
    {
      path:'chatlogs',
      component:ChatLogsComponent,
    },
    {
      path:'demo',
      component:DemoComponent
    },
    {
      path:'give_feedback',
      component:FeedbackComponent
    },
    {
      path:'chatbox2',
      component:Chatbox2Component
    },
    {
      path:'**',
      component:PageNotFoundComponent
    },
  ];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  
export class AppRoutingModule { }