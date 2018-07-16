import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { NewpopupComponent } from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import { PredictionService } from '../services/prediction.service';
@Component({
  selector: 'app-primecheck',
  templateUrl: './primecheck.component.html',
  styleUrls: ['./primecheck.component.css']
})
export class  PrimeCheckComponent implements OnInit {
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

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#9CCC65',
            borderWidth: 2,
            fill: false,
            data: [.2, .5, .6, 1.9, 8.4, 2.7, 0.9]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
}

  }

  

  