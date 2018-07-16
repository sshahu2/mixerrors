import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-newpopup',
  templateUrl: './newpopup.component.html',
  styleUrls: ['./newpopup.component.css']
})

export class NewpopupComponent implements OnInit {
  date:Date;
  qtr:any=[];
  month=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // timelineP=[
  //   {label:"Timeline",value:null}
  // ];
  compareData:any;
  predictionData:any;
  revData: any;
  disable: Boolean = false;
  entityList:any;
  selectedElementP:any;
  Entity:any;
  var2:any[]=[];
  inputP:any;
  entityNameSBU:any;
  entityNameVer:any;
  entityNameAcc:any;
  listofvar:any;
  filteredvarp:any;
  filteredvarm:any;
  appendarray:any[]=[];
  oflag:any;
  dummysbuarray:any[]=["BFSI","CBU"];
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

  constructor(private dialogRef: MatDialogRef<NewpopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data, private dataService: DataService, private router: Router, private predictService: PredictionService) { }

  ngOnInit() {
    console.log(this.data);
    this.getDate();
    this.predictService.getAllEntities().subscribe((entityList)=>{
           this.entityList =entityList;
           this.entityNameSBU = this.entityList[0]["SBU_LST"].split(",");
           this.entityNameVer =this.entityList[0]["VERTICAL_LST"].split(",");
           this.entityNameAcc =this.entityList[0]["VERTICAL_LST"].split(",");
          //  var timearr =  this.entityList[0]["QTR"].split(",");
          //   console.log("timeline :",timearr[0]);
          //  for(var x of timearr){
                
          //      var timeline = {label:x,value:{name:x} }
          //      console.log("timeline :",timeline);
          //      this.timelineP.push(timeline);
          //  }
      
          //  this
          //  this.entityP=this.entityList[0]["SBU_LST"].split(",")
           console.log("Entity List SBU :" + this.entityP[0]);
           console.log("Entity List VERTICAL :" + this.entityList[0]["VERTICAL_LST"]);
           console.log("Entity List QUATER:" + this.entityList[0]["QTR"]);
          
    })
  }

  getDate(){
     this.date =new Date();
     var qtr;
     var m = (this.date.getMonth() + 1);
     var rem = (m+3)%3;
     if(m<3 || m==12){
       qtr ="Q4"
       this.qtr.push(qtr);
       while(rem!=0){
         var str="";
         m=m-1;
         str=str+qtr+" After" + this.month[m] + "Closure";
         this.qtr.push[str];
       }
     
     }
     else if(m<6){
       qtr="Q1"
       this.qtr.push(qtr);
       while(rem!=0){
         var str="";
         m=m-1;
         str=str+qtr+" After" + this.month[m] + "Closure";
         this.qtr.push[str];
       }
     }
     else if (m<9){
       qtr="Q2"
       this.qtr.push(qtr);
       while(rem!=0){
         var str="";
         m=m-1;
         str=str+qtr+" After" + this.month[m] + "Closure";
         this.qtr.push[str];
       }
     }
     else if(m<12){
       qtr= "Q3"
       this.qtr.push(qtr);
       while(rem!=0){
         var str="";
         m=m-1;
         str=str+qtr+" After" + this.month[m] + "Closure";
         this.qtr.push[str];
       }
     }
     else{}
  }
  filtervarSinglep(event) {//use
      let query = event.query;
      console.log(query);
      if(this.selectedElementP.name=="SBU"){
          this.listofvar= this.entityNameSBU;
         
      }
     else if(this.selectedElementP.name=="VERTICAL"){
          this.listofvar=this.entityNameVer;
              }
  
     else  if(this.selectedElementP.name=="OVERALL"){
          // this.oflag=true;
      }
  
      this.filteredvarp = this.filterVar(query, this.listofvar);
     
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


  dropdown(drpDownParam) {
    if (drpDownParam.Entity == 'OVERALL') {
      this.disable = true;
    }
    else if (drpDownParam.Entity == 'SBU') {
      this.disable = false;
    }
    else if (drpDownParam.Entity == 'VERTICAL') {
      this.disable = false;
    }
    else {
      this.disable = false;
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
        this.dialogRef.close();
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
        this.dialogRef.close();
        this.router.navigate(["/landing"]);
      })
    }
    else {
      alert("PLEASE ENTER THE BUSINESS UNIT");
    }
 
  }
  filtervarMultiple(event) {//use
    let query = event.query;

   
    if(this.Entity.name=="SBU"){
        this.listofvar=this.dummysbuarray;//change it
    }
   else if(this.Entity.name=="VERTICAL"){
        this.listofvar=this.entityNameVer;
    }

   else  if(this.Entity.name=="ACCOUNTS"){
        this.listofvar=this.entityNameAcc;
    }

    this.filteredvarm = this.filterVar(query, this.listofvar);
    console.log("chalgaya");
  
   
   
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
        this.dialogRef.close();
        this.router.navigate(["/landing"]);
      })
    }
    else {
      alert("Insufficient Data");
    }
 
  }
  // getPredictionData(x, y) {
  //   var rev;
  //   if (x.Entity == 'SBU' || x.Entity == 'VERTICAL' || x.Entity == 'OVERALL') {
  //     this.predictService.getPredictionDataApi(x).subscribe((data: Array<any>) => {
  //       console.log("Menu-Tab Data :" + JSON.stringify(data))
  //       var rev;
  //       if (x.Entity == 'SBU') {
  //         var rev = data[0].SBU_PREDICTION
  //         console.log("INSIDE SBU WITH REV DETAIL");
  //       }
  //       else if (x.Entity == 'VERTICAL') {
  //         var rev = data[0].VERTICAL_PREDICTION_CURRENT_QTR
  //         console.log("INSIDE VERTICAL WITH REV DETAIL")
  //       }
  //       else if (x.Entity == 'OVERALL') {
  //         var rev = data[0].WIPRO_REVENUE_PREDICTED
  //         console.log("INSIDE SBU WITH REV DETAIL" + rev);

  //       }
  //       else {

  //       }
  //       this.revData = {
  //         Entity: x.Entity,
  //         EntityName: x.EntityName,
  //         Timeline: x.Timeline,
  //         Revenue: rev,
  //         Type: y

  //       }
  //       this.dataService.setParameter(this.revData);
  //       this.dialogRef.close();
  //       this.router.navigate(["/landing"]);
  //     })
  //   }
  //   else {
  //     alert("PLEASE ENTER THE BUSINESS UNIT");
  //   }
  // }
  clearp(x) {
    console.log("yeh hai");
    if(x.value["name"]=="OVERALL"){
        this.oflag=true;
        
      }
    
      else {
        this.oflag=false;
       
      }
    this.filteredvarm = [];
    this.appendarray = [];
    this.var2 = [];

}
cleari(){
    this.var2=[];
    console.log("gaya kya");
    console.log(this.var2);
}
  getHistoricPredictionData() {

  }
  onCloseCancel() {
    this.dialogRef.close();
  }
}