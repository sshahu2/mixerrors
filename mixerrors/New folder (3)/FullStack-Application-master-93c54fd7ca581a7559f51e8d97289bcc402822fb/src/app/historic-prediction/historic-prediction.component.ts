import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { NewpopupComponent} from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import {PredictionService} from '../services/prediction.service';

@Component({
  selector: 'app-historic-prediction',
  templateUrl: './historic-prediction.component.html',
  styleUrls: ['./historic-prediction.component.css']
})
export class HistoricPredictionComponent implements OnInit {
newpopDialogRef: MatDialogRef<NewpopupComponent>;
  count:number=0;
  option: any;
  data: any;
  dd:any;
  label=["Actual Revenue"];
  intent:any;
  intentName:any;
  timeline:any;
  nam: Boolean = true;
  Entity:any;
  EntityName:any;
  Timeline:any;
  newChange=[28];
  chan=[20,55,67,88,44,22,99,45,78,64,23,13];
//   call(x){
//     this.parameter1=x;
//     console.log("hhhhh" + this.parameter1);
// }


    

submit(x,y){
//   console.log("hello" + x.input1);
//   console.log("hello" + JSON.stringify(x, null, 4));
  
//   this.newChange[0]=this.chan[Math.floor(Math.random()*11)] ;
//   console.log("hhhhhh" + this.newChange[0]);
//   this.data = {
//     labels: this.label,
//     datasets: [
//         {
//             label: 'My First dataset',
//             backgroundColor:  ['#e53956','#bcb8b9','#bcb8b9','#bcb8b9'],
//             borderColor: '#1E88E5',
//             data:this.newChange,
//         },
        
//     ]
// }
//   this.dataService.setParameter(x);
  
var rev = this.predictService.getPredictionDataApi(x);
console.log("change in the prediction is done..." + rev);
console.log("ngon" + this.newChange[0] + "fffffffff" + rev);
var data={
  Entity:x.Entity,
  EntityName:x.EntityName,
  Timeline:x.Timeline,
  Revenue:rev

}
this.dataService.setParameter(data);
}
openFormDialog(type) {//popup
  this.newpopDialogRef = this.dialog.open( NewpopupComponent, {
    height:"auto",
    width: "auto",
    data: {
      value: type ? type : ""
    }
  });
}
constructor(private dataService: DataService,private router: Router,private dialog: MatDialog,private graphdialog: MatDialog,private newpopdialog:MatDialog,private predictService: PredictionService) {
  
}
ngOnInit() {   this.getPredictionData();   }

getPredictionData(){
  this.dataService.getParameter().subscribe(dd => {
    this.dd = dd;
    this.Entity = this.dd.Entity;
    this.EntityName = this.dd.EntityName;
    this.Timeline = this.dd.Timeline;
    this.newChange=[];
    // this.label=this.label.splice(0,1);
    this.newChange[0]=this.dd.Revenue;
    
    this.data = {
      labels: this.label,
      datasets: [
          {
              label: this.EntityName,
              backgroundColor:  ['#e53956','#bcb8b9','#bcb8b9','#bcb8b9'],
              borderColor: '#1E88E5',
              data:this.newChange,
          },
          
      ]
  }
  this.option ={
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              max:1000
          }
      }]
  }
}


} );
}

}
    

   