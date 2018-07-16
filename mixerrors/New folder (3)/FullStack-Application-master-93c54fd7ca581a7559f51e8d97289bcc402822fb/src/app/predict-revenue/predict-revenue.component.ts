import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { NewpopupComponent } from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import { PredictionService } from '../services/prediction.service';
@Component({
  selector: 'app-predict-revenue',
  templateUrl: './predict-revenue.component.html',
  styleUrls: ['./predict-revenue.component.css']
})
export class PredictRevenueComponent implements OnInit {
  qtrNum:any;
  newpopDialogRef: MatDialogRef<NewpopupComponent>;
  count: number = 0;
  data: any
  revData: any;
  dd: any;
  label = [];
  parameter1: number;
  parameter2: number;
  parameter3: number;
  parameter4: number;
  Entity: any;
  EntityName: any;
  Timeline: any;
  nam: Boolean = true;
  change: {
    Entity: any,
    EntityName: any,
    Timeline: any,
    parameter1: any
  };
  inference:any;
  disable: Boolean = false;
  option: any;
  newChange :any=[];
  chan :any;
  sbuMM: any;
  verMM: any;
  revenue: any;
  manMonth: any;
  newMM:any;
  changeInput:Boolean=true;
  backgroundColor=[];
  timelineP=[{label:'Timeline', value:null},
    {label:'Q1', value:{name:"Q1",qtrNum:0}},
    {label:'Q1 After April Closure', value:{name:"AQ1",qtrNum:1}},
    {label:'Q1 After May Closure', value:{name:"MQ1",qtrNum:2}}]
  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private graphdialog: MatDialog, private newpopdialog: MatDialog, private predictService: PredictionService) {

  }
  ngOnInit() {

    this.getPredictionData();


  }

  

  getPredictionData() {
    this.dataService.getParameter().subscribe(dd => {
     
      this.dd = dd;
      this.Entity = this.dd.Entity;
      this.EntityName = this.dd.EntityName;
      this.Timeline = this.dd.Timeline;
      this.inference=this.dd.Inference;
      this.newChange=[];
      this.parameter1=null
      this.count=0;
      this.backgroundColor=[];
      this.qtrNum=this.dd.Quarter;
      this.label=[];
      // this.label=this.label.splice(0,1)
      if(this.qtrNum == 0){
        this.label.push(this.timelineP[1].label)
             this.backgroundColor.push("#f4bb49")
             this.newChange[0]=this.dd.Revenue[0]
      }
      else if (this.qtrNum ==  1){
        for(var x=0;x<=1;x++){
          this.label.push(this.timelineP[x+1].label)
           this.backgroundColor.push("#f4bb49")
          this.newChange[x]=this.dd.Revenue[x];
        }
      }
      else if (this.qtrNum ==  2){
           for(var x=0;x<=2;x++){
             this.label.push(this.timelineP[x+1].label)
              this.backgroundColor.push("#f4bb49")
          this.newChange[x]=this.dd.Revenue[x];
        }
      }
      else{
        alert("No such Timeline present")
      }
      this.newChange = this.dd.Revenue;
      console.log("QUARTER NUMBER IS :" + this.qtrNum)
       if(this.Entity == "OVERALL"){
         this.disable =true;
         this.changeInput=false;
       }
       else{
         this.disable = false;
       }
      let revData;
      this.dataService.getInitParamValue().subscribe(data => {
        this.sbuMM = data['sbu']['TMM'];
        this.verMM = data['vertical']['TMM'];
        console.log('sbuMM', this.sbuMM);
        console.log('verMM', this.verMM);
        if (this.Entity === "SBU") {
          this.manMonth = this.sbuMM['' + this.EntityName.toUpperCase()]
        } else if (this.Entity === "VERTICAL") {
          this.manMonth = this.verMM['' + this.EntityName.toUpperCase()];
        }
        this.parameter1 = this.manMonth.toFixed(2);
        console.log('manMonth', this.manMonth);
      });


      this.data = {
        labels: this.label,
        datasets: [
          {
            label: this.EntityName,
            backgroundColor:this.backgroundColor,
            borderColor: '#1E88E5',
            data: this.newChange,
          },

        ]
      }
      this.option = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
 
            }
          }]
        }
      }


    });
  }
  dropdown(x) {
    if (x.Entity == 'OVERALL') {
      this.disable = true;
      this.changeInput=false;
    }
    else if (x.Entity == 'SBU') {
      this.disable = false;
      this.changeInput=true;
    }
    else if (x.Entity == 'VERTICAL') {
      this.disable = false;
      this.changeInput=true;
    }
    else {
      this.disable = false;
    }
  }
  call(x) {
    this.parameter1 = x;
    console.log("hhhhh" + this.parameter1);
  }
  predictionChange() {
    this.count = this.count + 1;
    var str = "change Prediction" + this.count;
    var change = {
      Entity: this.Entity,
      EntityName: this.EntityName,
      Timeline: this.Timeline,
      Input_Parameter: {
        Man_Month: this.parameter1
      }
    }
    // var changePrediction = this.predictService.getChangePredictionApi(change);
    this.predictService.getChangePredictionApi(change).subscribe((changePrediction)=>{
           this.newMM =changePrediction;
           console.log(changePrediction);
           if (this.count >= 4) {
      this.newChange.splice(1, 1);
      this.label.splice(1, 1);
    }
    this.label.push(str);
    this.backgroundColor.push("#bcb8b9")
    this.newChange.push(this.newMM.newRev/1000000);
    console.log("new manMonth"+ this.newMM.newRev);

     this.data = {
      labels: this.label,
      datasets: [
        {
          label: this.EntityName,
          backgroundColor:this.backgroundColor,
          borderColor: '#1E88E5',
          data: this.newChange
        },

      ]
    }

    })

  }


  submit(x, y) {
    console.log("submit" , x)
    var rev;
     var timeline=x.timelineP.name;
    var inputData ={
      Entity:x.Entity,
      EntityName:x.EntityName,
      Timeline:timeline,
      Quarter:x.timelineP.qtrNum
    }
    if (x.Entity == 'SBU' || x.Entity == 'VERTICAL' || x.Entity == 'OVERALL') {
      this.predictService.getPredictionDataApi(x).subscribe((datas: Array<any>) => {
        console.log("Menu-Tab Data :" +  inputData.Entity)
        var rev=[];
        if ( inputData.Entity == 'SBU') {
         rev.push(datas[0].SBU_PREDICTION)
          console.log("INSIDE SBU WITH REV DETAIL");
        }
        else if ( inputData.Entity == 'VERTICAL') {
          var a = datas[0].VERTICAL_PREDICTION_CURRENT_QTR.split("|")
          var arr =[];
          var num;
          for(var str of a){
              num = +str;
               rev.push(num)
          }
        }
        else if ( inputData.Entity== 'OVERALL') {
          rev.push(datas[0].WIPRO_REVENUE_PREDICTED)
          
          console.log("INSIDE SBU WITH REV DETAIL" + rev);

        }
        else { }

        this.revData = {
          Entity: x.Entity,
          EntityName: x.EntityName,
          Timeline: x.Timeline,
          Revenue: rev,
         Quarter:x.timelineP.qtrNum,
         Inference:datas[0].INFERENCE

        }
          this.dataService.getInitParamValue().subscribe(data => {
        this.sbuMM = data['sbu']['TMM'];
        this.verMM = data['vertical']['TMM'];
        console.log('sbuMM', this.sbuMM);
        console.log('verMM', this.verMM);
        if (this.Entity === "SBU") {
          this.manMonth = this.sbuMM['' + this.EntityName.toUpperCase()]
        } else if (this.Entity === "VERTICAL") {
          this.manMonth = this.verMM['' + this.EntityName.toUpperCase()];
        }
        console.log('manMonth', this.manMonth);
        this.parameter1 = this.manMonth.toFixed(2);
        
      });
        this.dataService.setParameter(this.revData);
        this.router.navigate([y]);
      })
    }
    else {
      alert("PLEASE ENTER THE BUSINESS UNIT");
    }



  }

  openFormDialog(type) {//popup
    this.newpopDialogRef = this.dialog.open(NewpopupComponent, {
      height: "auto",
      width: "auto",
      data: {
        value: type ? type : ""
      }
    });
  }

}
