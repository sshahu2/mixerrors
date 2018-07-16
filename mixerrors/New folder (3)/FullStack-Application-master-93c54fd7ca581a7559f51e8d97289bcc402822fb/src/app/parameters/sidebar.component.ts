import { Component, ViewChild, ElementRef,OnInit} from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { NewpopupComponent} from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import {PredictionService} from '../services/prediction.service';
@Component({
    selector: "para-root",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"]
})
export class SideBar implements OnInit {
    @ViewChild('barChart') barChart: ElementRef;

    barChartElement: any;
    data: any;
    prediction:Boolean=false;
    historicprediction:Boolean=false;
    compareprediction:Boolean=false;


    nam: Boolean = false;

  back() {
    this.router.navigate([""]);
  }
    // formatLabel(value: number | null) {
    //     if (!value) {
    //       return 0;
    //     }
    
    //     if (value >= 1000) {
    //       return Math.round(value / 1000) + 'k';
    //     }
    
    //     return this.parameter1;
    //   }
   
    constructor(private dataService: DataService,private router: Router,private dialog: MatDialog,private graphdialog: MatDialog,private newpopdialog:MatDialog,private predictService: PredictionService){
    
    }
    ngOnInit() { 
         this.extraFunction();
    }
    extraFunction(){
        this.dataService.getParameter().subscribe(dd => {
            this.data = dd;
            console.log("this is landing page" + this.data.Type)
            if(this.data.Type == 'prediction'){
                this.prediction=true;
                this.historicprediction=false;
                this.compareprediction=false;
            }
            else if(this.data.Type == 'historicprediction'){this.prediction=false;
                this.historicprediction=true;
                this.compareprediction=false;}
            else if(this.data.Type == 'comparerevenue'){this.prediction=false;
                this.historicprediction=false;
                this.compareprediction=true;}
        })
    }

   
}