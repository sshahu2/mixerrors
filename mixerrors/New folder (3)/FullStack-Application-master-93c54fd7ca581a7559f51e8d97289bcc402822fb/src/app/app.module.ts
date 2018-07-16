import { BrowserModule } from '@angular/platform-browser';
import {PredictionService } from './services/prediction.service'
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { NavbarComponent } from './navbar/navbar.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MaterialModule } from './material/material.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AnalysisComponent } from './analysis/analysis.component';

import { SearchresultComponent } from './searchResultPage/searchResult.component';

import { LoginComponent } from './login/login.component';

import { StockPriceComponent } from './stock-price/stock-price.component'
;
import { StocksService } from './stock-price/stocks.service';

import { SearchComponent } from './search/search.component';

import { GraphService } from './services/graph.service';

import { CustomizationDialogComponent } from './customization-dialog/customization-dialog.component';

import { GraphDialogComponent } from './graph-dialog/graph-dialog.component';

import {ChartModule} from 'primeng/chart';

import {TabViewModule} from 'primeng/tabview';


import { DataService } from './services/data.service';

import { TempComponent } from './temp/temp.component';

//import { PieChartComponent } from './pie-chart/pie-chart.component';

import { VerBarChartComponent } from './ver-bar-chart/ver-bar-chart.component';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { TableComponent } from './table/table.component';

import { VerticalsComponent } from './graph/verticals/vertical.component';

import { GraphComponent } from './graph/graph.component';

import { SbuGraphComponent } from './graph/sbu/sbu.component';

import { CardComponent } from './card/card.component';
import {DropdownModule} from 'primeng/dropdown';
import { ExtraComponent } from './extra/extra.component';
import {PopupComponent } from './pop-up/popup.component';
import { SearchPageComponent } from './search-page/search-page.component';
import {SideBar} from './parameters/sidebar.component';
import { DataFilterPipe } from './pipe/data.pipe';
import { MenuTabComponent } from './menu-tab/menu-tab.component';
import { HistoricPredictionComponent } from './historic-prediction/historic-prediction.component';
import { CompareRevenueComponent } from './compare-revenue1/compare-revenue.component';
import { PredictRevenueComponent } from './predict-revenue/predict-revenue.component';
import { PrimeCheckComponent } from './primecheck/primecheck.component';
import {NewpopupComponent} from './newpopup/newpopup.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
@NgModule({
  
   declarations: [
    NewpopupComponent,
	AppComponent,
     SideBar,
	 LoginComponent,
     PopupComponent  ,
	   HomeComponent,
 
	   NavbarComponent,
	   PrimeCheckComponent ,
 
	   DashboardComponent,

	    AnalysisComponent,
	
    StockPriceComponent,
 
	   SearchComponent,
	
    SearchresultComponent,
 
	   CustomizationDialogComponent,

	    GraphDialogComponent,
  
	  TempComponent,
  
	  VerBarChartComponent,
  
	  LandingPageComponent,
    
	SbuGraphComponent,
  
	  CardComponent,
 
	   ExtraComponent,

	    GraphComponent,
 
	   VerticalsComponent,

	    TableComponent,
  
	  SearchPageComponent,
   
	 DataFilterPipe,
   
	 MenuTabComponent,
   
	 HistoricPredictionComponent,
   
	 CompareRevenueComponent,
   
	 PredictRevenueComponent
  ],

     imports: [

	    BrowserModule,
       AutoCompleteModule,
	    FormsModule,
        DropdownModule,
	   MaterialModule,
 
	   BrowserAnimationsModule,
 
	   HttpClientModule,
  
	  AppRoutingModule,
    
	ChartModule,
	CheckboxModule
  ],
  
   providers: [ StocksService, GraphService, DataService,PredictionService ],
  bootstrap: [ AppComponent ],
  entryComponents: [ AnalysisComponent, SearchresultComponent, GraphDialogComponent ,NewpopupComponent]
})
export class AppModule { }
