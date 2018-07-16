import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { NewpopupComponent} from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import {PredictionService} from '../services/prediction.service';

@Component({
  selector: 'app-compare-revenue',
  templateUrl: './compare-revenue.component.html',
  styleUrls: ['./compare-revenue.component.css']
})
export class CompareRevenueComponent implements OnInit {
 query="";
  newpopDialogRef: MatDialogRef<NewpopupComponent>;
  count:number=0;
  data: any;
  dd:any;
  revData:any;
  predictionData:any;
  compareData:any;
  label=["Original Prediction"];
  parameter1:number;
  parameter2:number;
  parameter3:number;
  parameter4:number;
  bigImageUrl:String;
  imageUrls=["./../../assets/for_landing/PR.jpg%revenue%prediction","./../../assets/for_landing/AC.jpeg%revenue%historical","./../../assets/for_landing/RC.jpg%revenue%compare"];
  queryPrediction=["Predict the revenue for BFSI for Q1",
    "Last quarter forecast",
    "Estimated revenue of Apple vertical for previous quarter",
    
    "What is the revenue of Wipro Technologies for last financial year",
   " Vertical level revenue of BFSI", 
    "what is revenue of LBG",
    
    "Compare revenue of Apple and LBG",
   " Compare Q3 vs Q4",
    "predicted growth of ENU" ];
  queryActual=["a1","a2","a3"];
  queryCompare=["c1","c2","c3"];
  intent:any;
  intentName:any;
  timeline:any;
  Entity:any;
  EntityName:any;
  Timeline:any;
  Revenue:any;
  nam: Boolean = true;
  option:any;
  first:any;
  second:any;
  change:{
    intent:any,
    intentName:any,
    timeline:any,
    parameter1:any

  };
  entityP=[{label:'Select ', value:null},
  {label:'SBU', value:{name:"SBU"}},
  {label:'VERTICAL', value:{name:"VERTICAL"}},
  {label:'OVERALL', value:{name:"OVERALL"}}];
timelineP=[{label:'Timeline', value:null},
  {label:'Q1', value:{name:"Q1",qtrNum:0}},
  {label:'Q1 After April Closure', value:{name:"AQ1",qtrNum:1}},
  {label:'Q1 After May Closure', value:{name:"MQ1",qtrNum:2}}]

  elements:any[]= [
    {label:'Select ', value:null},
    {label:'SBU', value:{name:"SBU"}},
    {label:'VERTICAL', value:{name:"VERTICAL"}},
    {label:'ACCOUNTS', value:{name:"ACCOUNTS"}},
    {label:'OVERALL', value:{name:"OVERALL"}}]; 
    filteredvarm:any[]=[];
    listofvar:any;
      newChange=[28];
  chan=[20,55,67,88,44,22,99,45,78,64,23,13];
  call(x){
    this.parameter1=x;
    console.log("hhhhh" + this.parameter1);
}
animate() {
  if (this.query.length > 0) {
    console.log(this.query);
   console.log("Please rephrase your query")
 this.dataService.setSearchQuery(this.query);
 this.router.navigate(["/searchResult"]);
} else {
 alert("Please rephrase your query");
}
}
passQuery(query){
  if (query.length > 0) {
    console.log("Please rephrase your query")
  this.dataService.setSearchQuery(query);
  this.router.navigate(["/searchResult"]);
 } else {
  alert("Please rephrase your query");
 }
}
submitActual(inputParam, btnFunction){
  var rev=0;
if (inputParam.Entity == 'SBU' || inputParam.Entity == 'VERTICAL' || inputParam.Entity == 'OVERALL') {
this.predictService.getActualDataApi(inputParam).subscribe((data: Array<any>) => {
   var datas = data;
   var  Q1=0,Q2=0,Q3=0,Q4=0;
// console.log("Menu-Tab Data :" + JSON.stringify(data))
var rev=0;
if (inputParam.Entity == 'SBU') {
   var sbuData;
   console.log("SBU ACTUAL REVENUE :",datas);
   for(var x of datas){
     console.log("Vertical revenue OF q1 :",  x.VERTICAL_REVENUE_Q1)
     console.log("this is the Title :",x.title);
     if(x.title){break;}
     Q1=Q1+ x.VERTICAL_REVENUE_Q1;
     Q2=Q2+ x.VERTICAL_REVENUE_Q2;
     Q3=Q3+ x.VERTICAL_REVENUE_Q3;
     Q4=Q4+ x.VERTICAL_REVENUE_Q4;
   }
    if(inputParam.Timeline =="Q1"){
      var rev = Q1
}
else if(inputParam.Timeline =="Q2"){
  var rev = Q2
} 
else if(inputParam.Timeline =="Q3"){
  var rev = Q3
} 
else if(inputParam.Timeline =="Q4"){
  var rev =Q4
} 
else{
  alert("No Timeline Selected")
}
  

}
else if (inputParam.Entity == 'VERTICAL') {
   var verData;
 
   console.log("INSIDE ACTUAL REVENUE :", datas);
     Q1= datas[0].VERTICAL_REVENUE_Q1;
     Q2= datas[0].VERTICAL_REVENUE_Q2;
     Q3= datas[0].VERTICAL_REVENUE_Q3;
     Q4=datas[0].VERTICAL_REVENUE_Q4;
 
  
    if(inputParam.Timeline =="Q1"){
      var rev = Q1;
}
else if(inputParam.Timeline =="Q2"){
  var rev = Q2;
} 
else if(inputParam.Timeline =="Q3"){
  var rev = Q3;
} 
else if(inputParam.Timeline =="Q4"){
  var rev = Q4;
} 
else{
  alert("No Timeline Selected")
}

}
else if (inputParam.Entity == 'OVERALL') {
  var overallData;
 
    for(var x of datas){
   if(x.title){break;}
     Q1=Q1+ x.SBU_REVENUE_Q1;
     Q2=Q2+ x.SBU_REVENUE_Q2;
     Q3=Q3+ x.SBU_REVENUE_Q3;
     Q4=Q4+ x.SBU_REVENUE_Q4;
   }
  
    if(inputParam.Timeline =="Q1"){
      var rev = Q1;
}
else if(inputParam.Timeline =="Q2"){
  var rev = Q2;
} 
else if(inputParam.Timeline =="Q3"){
  var rev = Q3;
} 
else if(inputParam.Timeline =="Q4"){
  var rev = Q4;
} 
else{
  alert("No Timeline Selected")
}
  
 

}
else {
}
this.revData = {
  Entity: inputParam.Entity,
  EntityName: inputParam.EntityName,
  Timeline: inputParam.Timeline,
  Revenue: rev,
  Type: btnFunction

}
this.dataService.setParameter(this.revData);

this.router.navigate(["/landing"]);
})
}
else {
alert("PLEASE ENTER THE BUSINESS UNIT");
}
}
submitPred(inputParam, btnFunction) {
var rev;
var timeline=inputParam.timelineP.name;
var  inputData ={
Entity:inputParam.selectedElementP.name,
EntityName:inputParam.inputP,
Timeline:timeline,
Quarter:inputParam.timelineP.qtrNum
}
if (inputData.Entity == 'SBU' || inputData.Entity == 'VERTICAL' || inputData.Entity == 'OVERALL') {
this.predictService.getPredictionDataApi(inputData).subscribe((data: Array<any>) => {
this.predictionData =data;
console.log("Menu-Tab Data :" + JSON.stringify(data))
var rev=[];
if (inputData.Entity == 'SBU') {
  rev.push(data[0].SBU_PREDICTION)
  console.log("INSIDE SBU WITH REV DETAIL");
}
else if (inputData.Entity == 'VERTICAL') {
  var x = data[0].VERTICAL_PREDICTION_CURRENT_QTR.split("|")
  var arr =[];
  var num;
  for(var str of x){
      num = +str;
       rev.push(num)
  }
 
 
  console.log("INSIDE VERTICAL WITH REV DETAIL" + rev)
}
else if (inputData.Entity == 'OVERALL') {
   rev.push(data[0].WIPRO_REVENUE_PREDICTED)
  
  console.log("INSIDE SBU WITH REV DETAIL" + rev);

}
else {
}
this.revData = {
  Entity: inputData.Entity,
  EntityName: inputData.EntityName,
  Timeline: inputData.Timeline,
  Revenue: rev,
  Type: btnFunction,
  Quarter:inputData.Quarter,
  Inference:data[0].INFERENCE

}
this.dataService.setParameter(this.revData);
;this.router.navigate(["/landing"]);
})
}
else {
alert("PLEASE ENTER THE BUSINESS UNIT");
}

}
submitCompare(inputParam, btnFunction) {
  var rev;
  console.log(inputParam);
  console.log(btnFunction);
  var timeline=inputParam.Timeline;
 var  inputData ={
    Entity:inputParam.Entity.name,
    EntityName:inputParam.EntityName,
    Timeline:timeline,
    
  }
  if (inputData.Entity == 'SBU' || inputData.Entity == 'VERTICAL' || inputData.Entity == 'ACCOUNTS'|| inputData.Entity == 'OVERALL') {
    this.predictService.getRevenueCompareApi(inputData).subscribe((data: Array<any>) => {
      this.compareData =data;
      console.log("Menu-Tab Data :" + JSON.stringify(data))
      var rev=[];
      if (inputData.Entity == 'SBU') {
        rev.push(data[0].SBU_PREDICTION)
        console.log("INSIDE SBU WITH REV DETAIL");
      }
      else if (inputData.Entity == 'VERTICAL') {
        var x = data[0].VERTICAL_PREDICTION_CURRENT_QTR.split("|")
        var arr =[];
        var num;
        for(var str of x){
            num = +str;
             rev.push(num)
        }
       
       
        console.log("INSIDE VERTICAL WITH REV DETAIL" + rev)
      }
      else if (inputData.Entity == 'OVERALL') {
         rev.push(data[0].WIPRO_REVENUE_PREDICTED)
        
        console.log("INSIDE SBU WITH REV DETAIL" + rev);

      }
      else {
      }
      this.revData = {
        Entity: inputData.Entity,
        EntityName: inputData.EntityName,
        Timeline: inputData.Timeline,
        Revenue: rev,
        Type: btnFunction,
        // Quarter:inputData.Quarter,
        // Inference:data[0].INFERENCE

      }
      this.dataService.setParameter(this.revData);
 
      this.router.navigate(["/landing"]);
    })
  }
  else {
    alert("Insufficient Data");
  }

}
filterVar(query, variables: any[]):any[] {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : any[] = [];
  for(let i = 0; i < variables.length; i++) {
      let variable = variables[i];
      if(variable.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(variable);
      }
  }
  return filtered;//also this
}
filtervarMultiple(event) {//use
  let query = event.query;

 
  if(this.Entity.name=="SBU"){
      this.listofvar=["s1","s2","s3","s4","s5","s6","s7"];//change it
  }
 else if(this.Entity.name=="VERTICAL"){
      this.listofvar=["v1","v2","v3"];
  }

 else  if(this.Entity.name=="ACCOUNTS"){
      this.listofvar=["a1","a2","a3"];
  }

  this.filteredvarm = this.filterVar(query, this.listofvar);
  console.log("chalgaya");

 
 
}
// submit(x,y){
//   console.log("hello" + JSON.stringify(x, null, 4));
//   this.dataService.setParameter(x);
//   if (y.length > 0) {
//     console.log("hello" + x.input1);
    
//    this.router.navigate(["/landing",y]);
    
//   } else {
 
//     alert("Please rephrase your query");
    
//   }
// }
breakString(received){
  var res = received.split("%");
  this.bigImageUrl=res[0];
  this.first=res[1];
  this.second=res[2];

}
changeImage(header){
 this.breakString(header);
}
submit(x,y){
  var rev = this.predictService.getRevenueCompareApi(x);
  console.log("change in the prediction is done..." + rev);
  console.log("ngon" + this.newChange[0] + "fffffffff" + rev);
  var data={
    Entity:x.Entity,
    EntityName:x.EntityName,
    Timeline:x.Timeline,
    //Revenue:rev
  
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
ngOnInit() { this.getCompareData();
this.breakString(this.imageUrls[0]);
}
  getCompareData(){
  this.dataService.getParameter().subscribe(dd => {
    this.dd = dd;
    this.Entity = this.dd.Entity;
    this.EntityName = this.dd.EntityName;
    this.Timeline = this.dd.Timeline;;
    this.Revenue=this.dd.Revenue;
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
