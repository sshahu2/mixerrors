import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchresultComponent } from '../searchResultPage/searchResult.component';
import { LoginComponent } from '../login/login.component';
import { TempComponent } from '../temp/temp.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { CompareRevenueComponent} from '../compare-revenue1/compare-revenue.component';

// import {SideBar} from '../menu-tab/menu-tab.component';
import {SideBar} from '../parameters/sidebar.component'

const routes: Routes = [
  // { path: '', component: LoginComponent , pathMatch: 'full' },
  // { path: 'search-result', component: SearchresultComponent },
  // { path: 'search-result', component: TempComponent },
  // { path: 'home', component: DashboardComponent }
  { path: '', component: SearchPageComponent, data: {depth: 1} },
  { path: 'searchResult', component: SearchresultComponent, data: {depth: 2}  },
  {path:'landing' ,  data: {depth: 2}  ,component:SideBar},
  {path:'new'  ,component:CompareRevenueComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
