import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges
} from "@angular/core";

declare var jquery: any;

declare var $: any;

import { DataService } from "../services/data.service";
import { CustomizationDialogComponent } from "../customization-dialog/customization-dialog.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import { StocksService } from "../stock-price/stocks.service";
import { MatTableDataSource } from "@angular/material";
import { Element } from "../model/element";
import { GraphDialogComponent } from "../graph-dialog/graph-dialog.component";
import { Router,Params,ActivatedRoute } from "@angular/router";


@Component({
  
      selector: "app-searchresult",
 
      templateUrl: "./searchResult.component.html",
  
      styleUrls: ["./searchResult.component.css"]

})

export class SearchresultComponent implements OnInit, AfterViewInit {

     @ViewChild("compareBarChart") compareBarChart: ElementRef;

     @ViewChild("predictedDetailChart") predictedDetailChart: ElementRef;

     @ViewChild("sbuDetailActualChart") doughnut: ElementRef;
   
  @ViewChild("verDetailActualChart") verBarChart: ElementRef;
   
  @ViewChild("accDetailActualChart") accBarChart: ElementRef;

  @ViewChild("accTimeLineDetailChart") accTimeLineChart: ElementRef;
    
  query: any;
 api_url:any;
 nlpResult: any;
  options: any;
  relevantQuery: any;
  actualResult: any;
  message = "";
 id:any;
 alertMsg = "";
  title: "";
   prediction:Boolean=false;
  actuals:Boolean=false;
   searchData:Boolean=false;
  compareBarElement: any;
  predictedDetailElement: any;
  sbuDetailActualElement: any;
 
 verDetailActualElement: any;
  accDetailActualElement: any;
  accTimeLineDetailElement: any;

  apiData: any;
 
 compareBarChartdata: any;
  sbuDetailActualData: any;
  verDetailActualdata: any;
  accDetailActualdata: any;
 
 accTimeLineDetaildata: any;
  predictedDetailChartdata: any;
 
 predictedDetailTabledata: any;
  predictedTableHeader: any;
  accountTableHeader: any;


  showCompareTimeChart = false;
  showPredictedDetailChart = false;

  showSbuChart = false;
  showVerChart = false;
  showAccChart = false;
  showTimeLineChart = false;

  showOfftopic = false;
  showActualResult = false;
  showAccTable = false;
   ch:any;
   compareRevene:Boolean=false;
  
constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
  console.log("i am changing")
    this.options = {
      responsive: true,
      title: {
        display: true,
        text: ''
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: ''
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Revenue'
          },
          ticks: { min: 0 }
        }]
      }
    };

  }


  ngOnInit() {
    console.log("i am changing...........")
  
      this.getNlpResult();
   
    
  
  }
 
  ngAfterViewInit() {
   
    try {
      this.sbuDetailActualElement = this.doughnut.nativeElement;
      this.verDetailActualElement = this.verBarChart.nativeElement;
      this.accDetailActualElement = this.accBarChart.nativeElement;
      this.accTimeLineDetailElement = this.accTimeLineChart.nativeElement;
      this.compareBarElement = this.compareBarChart.nativeElement;
      this.predictedDetailElement = this.predictedDetailChart.nativeElement;
    } catch (error) { }
    // Chart['plugins'].register({
    //   afterDatasetsDraw: function (chart) {
    //     var ctx = chart.ctx;
    //     chart.data.datasets.forEach(function (dataset, i) {
    //       var meta = chart.getDatasetMeta(i);
    //       if (!meta.hidden) {
    //         meta.data.forEach(function (element, index) {
    //           // Draw the text in black, with the specified font
    //           ctx.fillStyle = 'rgb(0, 0, 0)';
    //           var fontSize = 16;
    //           var fontStyle = 'normal';
    //           var fontFamily = 'Helvetica Neue';
    //           ctx.font = Chart['helpers'].fontString(fontSize, fontStyle, fontFamily);
    //           // Just naively convert to string for now
    //           var dataString = dataset.data[index].toString();
    //           // Make sure alignment settings are correct
    //           ctx.textAlign = 'center';
    //           ctx.textBaseline = 'middle';
    //           var padding = 5;
    //           var position = element.tooltipPosition();
    //           ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
    //         });
    //       }
    //     });
    //   }
    // });
  }


  back() {
    this.router.navigate([""]);
  }

  getRelevantQuery(relQuery) {
    this.query = relQuery;
    this.getNlpResult();
  }

  getNlpResult() {
   
    this.dataService.getSearchQuery().subscribe(query => {
      console.log("searchData" + query + "actuals" + query);
    
      this.alertMsg = "";
      this.query = query;
      this.showCompareTimeChart = false;
      this.showPredictedDetailChart = false;
      this.showSbuChart = false;
      this.showOfftopic = false;
      this.showActualResult = false;
      this.showTimeLineChart = false;
      this.showSbuChart = false;
      this.showVerChart = false;
      this.showAccChart = false;
      this.showAccTable = false;
      try {
        if (this.query == '') {
          this.alertMsg = "Please Enter your query";
          this.showOfftopic = true;
          return false;
        }
        console.log("User Query : ", query);
        this.dataService.destructureQuery(this.query).subscribe(nlpResult => {
          this.nlpResult = nlpResult["nlpresult"];
          this.api_url= nlpResult["api_url"];
          console.log('NLP Result : ', this.nlpResult);
          const intent = nlpResult["intent"];
          if (intent === 'offtopic') {
            this.relevantQuery = nlpResult['relevantQuery'];
            this.alertMsg = "Please rephrase your query";
            this.showOfftopic = true;
            return false;
          }
          // this.route.params.forEach((params: Params) => {
          //   this.id = params['id'];})
          // if(this.id == "prediction"){
          //      this.prediction=true;
          //      this.actuals=false;
          // }
          // else if(this.id == "Historic_data"){
          //   this.actuals=true;
          //   this.prediction=false;
          // }
          // else if(this.id == "compare_Revenue"){}
          // else {
            
          //   this.prediction=false;
          // }
          this.getNewApi(this.api_url);
          // this.getApiData(this.nlpResult);
        }, err => {
          //alert("Oops!! Can not reach Server right now. Please try after some time.");
          this.alertMsg = "Oops!! Can not reach Server right now. Please try after some time.";
          this.showOfftopic = true;
        });
      } catch (err) {
        console.log(err);
        this.alertMsg = "Sorry, Could not understand your query. Can you rephrase it again?";
        this.showOfftopic = true;
      }
    });
  }
  ///////////////////////////////////////////////////////
  // getNewApi(url){
         
  //        this.dataService.getNewApi(url).subscribe((api)=>{
  //  this.apiData=api;
  //          for (let d of this.apiData) {
  //             console.log("this is the new apis" , d);
  //   }
          
  //        })
  // }

  getNewApi(api_url) {
    console.log("api url",api_url);
    let nlpResult = this.nlpResult;
    let intent = nlpResult['intent'];
    this.dataService.getNewApi(api_url).subscribe((data: Array<any>) => {
      console.log("API Data : ", data);
      this.apiData = data;
      if (data['title']) {
        this.alertMsg = data['title'];
        this.showOfftopic = true;
        return false;
      } else if (data.length == 0) {
        this.alertMsg = "Sorry, We could not get the result. Please try other query?";
        this.showOfftopic = true;
        return false;
      } else if (data[0]['title']) {
        this.alertMsg = 'Sorry, We could not get the result. Please try other query?';
        this.showOfftopic = true;
        return false;
      }
      if (intent === "revenueTimeline") {
        this.getActualResult(nlpResult);
      }
      if (intent === "revenueCompare") {
        this.createCompareChart(nlpResult, data);
        this.showCompareTimeChart = true;
      } else if (intent === "revenueDetails") {
        if (nlpResult["revenueState"] === "predicted") {
          //this.createPredictedDetailChart(nlpResult, data);
          if (nlpResult['sbu'].length > 0 || nlpResult['vertical'].length > 0) {
            this.createPredictedSbuChart(nlpResult, data);
          } else if (nlpResult['sbu'].length == 0 || nlpResult['vertical'].length == 0) {
            this.createPredictedOverAllChart(nlpResult, data);
          }
          this.showPredictedDetailChart = true;
        } else if (nlpResult['revenueLevel'] === 'overall' && nlpResult['timeline'].length > 0) {
          this.createSbuActualDetail(nlpResult, data);
        } else if (nlpResult['revenueLevel'] == 'sbu' && nlpResult['sbu'].length > 0) {
          this.createSbuActualDetail(nlpResult, data);
        } else if (nlpResult['revenueLevel'] == "account" && nlpResult['account'].length > 0) {
          console.log("helo");  
          this.createAccTimeLineActualDetail(nlpResult, data);
        } else if (nlpResult['revenueProperty'].trim() === 'growth') {
          this.createCompareChart(nlpResult, data);
        } 
        else if (nlpResult["revenueState"].length === 0) {
          // this.createActualDetailChart(nlpResult, data);
          this.getActualResult(nlpResult);
          return false;
        }
      } else if (intent === 'sbuDetails') {
        if (nlpResult['revenueState'] != 'predicted') {
          if (nlpResult['revenueLevel'] == 'sbu') {
            this.createSbuActualDetail(nlpResult, data);
          }
        }
      } else if (intent === "verticalDetails") {
        console.log("dajdhgk");
        if (nlpResult['revenueState'] != 'predicted') {
          if (nlpResult['revenueLevel'] == 'sbu') {
            this.createSbuActualDetail(nlpResult, data);
          }
        } else if (nlpResult['revenueState'] == "predicted" && !nlpResult['revenueProperty']) {
          this.createPredictedSbuChart(nlpResult, data);
        } else if (nlpResult['revenueProperty'] == "min growth" || nlpResult['revenueProperty'] == "max growth") {
          this.createVerticalGrowthChart(nlpResult, data);
        } else if (nlpResult['revenueState'] == "predicted" && (nlpResult['sbu'].length > 0 || nlpResult['vertical'].length > 0)) {
          this.createPredictedSbuChart(nlpResult, data);
        } else {
          this.alertMsg = "Sorry, We could not get the result. Please try other query?";
          this.showOfftopic = true;
        }
      } else if (intent === "accountDetails") {
        this.getAccountDetails(nlpResult, data);
      }
    }, err => {
      this.alertMsg = "Sorry, We could not get the result. Please try other query?";
      this.showOfftopic = true;
    });
  }

  getAccountDetails(nlpResult, apiData) {
    if (nlpResult.revenueState != "predicted") {
      if (nlpResult.sbu.length > 0 && nlpResult.timeline.length > 0) {
        if (nlpResult.revenueProperty == 'max' || nlpResult.revenueProperty == 'min') {
          this.accountTableHeader = Object.keys(apiData[0]);
          console.log(this.accountTableHeader);
          this.showAccTable = true;
        } else if (nlpResult['revenueLevel'] == 'sbu') {
          this.createAccActualDetail(nlpResult, apiData);
        }
      } else if (nlpResult.vertical.length > 0) {
        if (nlpResult.revenueLevel == 'vertical') {
          this.createAccActualDetail(nlpResult, apiData);
        }
      }
    }
  }

  getVerticalPredicted(event) {
    if (this.apiData[0]['VERTICAL']) {
      this.nlpResult['vertical'] = this.apiData[0]['VERTICAL'];
      this.getNewApi(this.nlpResult);
    } else {
      let selectedSbu = this.predictedDetailChartdata.labels[event.element._index];
      console.log(selectedSbu);
      this.nlpResult['sbu'][0] = selectedSbu;
      console.log(this.nlpResult['sbu']);
      this.getNewApi(this.nlpResult);
    }
  }

  getVerticalActual(event) {
    if (this.apiData[0]['VERTICAL']) {
      this.nlpResult['vertical'] = this.apiData[0]['VERTICAL'];
      this.getNewApi(this.nlpResult);
    } else {
      let selectedSbu = this.sbuDetailActualData.labels[event.element._index];
      console.log(selectedSbu);
      this.nlpResult['sbu'][0] = selectedSbu;
      this.nlpResult.revenueLevel = "sbu";
      console.log(this.nlpResult['sbu']);
      this.getNewApi(this.nlpResult);
    }
  }

  getActualResult(nlpResult) {
    let arr = Object.keys(this.apiData[0]);
    // console.log(this.apiData[0]['' + arr[0]]);
    this.actualResult = this.apiData[0]['' + arr[0]];
    this.showActualResult = true;
  }

  createVerticalGrowthChart(nlpResult, apiData) {
    let labels = [];
    let data = [];
    apiData.sort(function (a, b) {
      return b.PERCENTAGE_OF_CHANGE - a.PERCENTAGE_OF_CHANGE;
    });
    for (let d of apiData) {
      labels.push(d.VERTICAL);
      data.push(d.PERCENTAGE_OF_CHANGE);
    }
    this.verDetailActualdata = {
      labels: labels,
      datasets: [
        {
          label: "Verticals with " + nlpResult['revenueProperty'],
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: data
        }
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    try {
      this.showVerChart = true;
    } catch (error) { }
  }

  createPredictedOverAllChart(nlpResult, apiData) {
    let labels = [];
    let data = [];
    for (let d of apiData) {
      if (!d.title) {
        labels.push(d.SBU);
        data.push(d.SBU_PREDICTION);
      }
    }
    // console.log(labels, data);
    this.predictedDetailChartdata = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#36A2EB",
            "#FFCE56",
            "#00a950"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#36A2EB",
            "#FFCE56",
            "#00a950"
          ]
        }
      ]
    };
    this.predictedTableHeader = Object.keys(apiData[0]);
  }

  createPredictedSbuChart(nlpResult, apiData) {
    let labels = [];
    let data = [];
    for (let d of apiData) {
      if (!d.title) {
        labels.push(d.VERTICAL);
        data.push(d.VERTICAL_REVENUE_PREDICTED);
      }
    }
    this.predictedDetailChartdata = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ]
        }
      ]
    };
    this.predictedTableHeader = Object.keys(apiData[0]);
    this.showPredictedDetailChart = true;
  }

  createActualDetailChart(nlpResult, data) {
    if (nlpResult.sbu === "allSbu") {
      this.createSbuActualDetail(nlpResult, data);
    } else if (nlpResult.sbu) {
      let selectedSbu = nlpResult.sbu;
      this.createVerActualDetail(nlpResult, selectedSbu, data);
    } else if (nlpResult.vertical) {
      let selectedVer = nlpResult.vertical;
      this.createAccActualDetail(nlpResult, data);
    } else if (nlpResult.account) {
      let selectedAcc = nlpResult.account;
      this.createAccTimeLineActualDetail(nlpResult, data);
    }
    this.showPredictedDetailChart = false;
  }

  createSbuActualDetail(nlpResult, apiData) {
    let labels = [];
    let data = [];
    let qtr = nlpResult.timeline[1];
    for (let d of apiData) {
      if (!d.title) {
        if (nlpResult['sbu'].length > 0) {
          labels.push(d['VERTICAL']);
          data.push(d['VERTICAL_REVENUE_' + qtr])
        } else if (nlpResult['revenueLevel'] == 'overall') {
          labels.push(d['SBU']);
          data.push(d['SBU_REVENUE_' + qtr]);
        }
      }
    }
    this.sbuDetailActualData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#78bf68",
            "#a57fb7",
            "#f57439",
            "#4d0d4f"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba",
            "#78bf68",
            "#a57fb7",
            "#f57439",
            "#4d0d4f"
          ]
        }
      ]
    };
    this.options = {
      responsive: false,
      legend: {
        position: "top"
      },
      title: {
        display: true,
        // text: data[data.length-1].title
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    };
    this.showSbuChart = true;
    this.predictedTableHeader = Object.keys(apiData[0]);
    console.log('sbu_detail_actual_data', this.sbuDetailActualData);
  }

  selectPie(event) {
    let selectedSbu = this.sbuDetailActualData.labels[event.element._index];
    this.createVerActualDetail(this.nlpResult, selectedSbu, this.apiData);
  }

  getAccounts(event) {
    let selectedVer = this.verDetailActualdata.labels[event.element._index];
    this.createAccActualDetail(this.nlpResult, this.apiData);
  }

  getLineChart(event) {
    let selectedAcc = this.accDetailActualdata.labels[event.element._index];
    this.createAccTimeLineActualDetail(
      this.nlpResult,
      this.apiData
    );
  }

  createVerActualDetail(nlpResult, selectedSbu, apiData) {
    let labels = [];
    let data = [];
    apiData.sort(function (a, b) {
      return b.VERTICAL_REVENUE - a.VERTICAL_REVENUE;
    });
    for (let d of apiData) {
      if (selectedSbu.toLowerCase() === d.sbu.toLowerCase()) {
        labels.push(d.VERTICAL);
        data.push(d.VERTICAL_REVENUE);
      }
    }
    this.verDetailActualdata = {
      labels: labels,
      datasets: [
        {
          label: selectedSbu + "'s verticals",
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: data
        }
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    try {
      this.verDetailActualElement.refresh();
    } catch (error) { }
  }

  createAccActualDetail(nlpResult, apiData) {
    let labels = [];
    let data = [];
    let qtr = nlpResult.timeline[1];
    apiData.sort(function (a, b) {
      return b['ACCOUNT_REVENUE_' + qtr] - a['ACCOUNT_REVENUE_' + qtr];
    });
    for (let d of apiData) {
      if (!d['title']) {
        labels.push(d['ACCOUNT']);
        data.push(d['ACCOUNT_REVENUE_' + qtr]);
      } else if (d['title']) {
        this.title = d['title'];
      }
    }
    this.accDetailActualdata = {
      labels: labels,
      datasets: [
        {
          label: nlpResult.sbu,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: data
        }
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    this.showAccChart = true;
  }

  createAccTimeLineActualDetail(nlpResult, apiData) {
    let labels = ["Q1", "Q2", "Q3", "Q4"];
    let data = [];
    let selectedAcc = nlpResult.account[0];
    for (let t of apiData) {
      if (!t['title']) {
        for (let label of labels) {
          data.push(t['ACCOUNT_REVENUE_' + label]);
        }
      }
    }
    this.accTimeLineDetaildata = {
      labels: labels,
      datasets: [
        {
          label: selectedAcc + "'s Timeline Data",
          data: data,
          fill: false,
          borderColor: this.getRandomColor()
        }
      ],
      options: {
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                min: 0
              }
            }
          ]
        }
      }
    };
    this.accountTableHeader = Object.keys(apiData[0]);
    this.showTimeLineChart = true;
  }

  createCompareChart(nlpResult, data) {
    if (nlpResult.timeline.length >= 0) {
      if (nlpResult.revenueState.length < 2) {
        this.message = '';
      } else {
        this.message = "*Results are showing for Actual values";
      }
      if (nlpResult.account && nlpResult.account.length >= 1) {
        this.compareAccounts(nlpResult, data);
      } else if (nlpResult.vertical && nlpResult.vertical.length >= 1) {
        this.compareVerticals(nlpResult, data);
      } else if (nlpResult.sbu && nlpResult.sbu.length >= 1) {
        this.compareSbus(nlpResult, data);
      } else if (nlpResult.sbu.length == 0 && nlpResult.vertical.length == 0 && nlpResult.account.length == 0) {
        this.compareOverAll(nlpResult, data);
      }
    }
  }

  compareOverAll(nlpResult, data) {
    let labels = nlpResult.timeline;
    let sbus = data.map(a => a.SBU);
    let compareData = { labels: labels, datasets: [] };

    for (let sbu of sbus) {
      let tlData = [];
      for (let q of labels) {
        data.map(d => {
          if (d.SBU === sbu && !d.title) {
            tlData.push((d["" + q] / 1000000).toFixed(2));
          }
        });
      }
      compareData.datasets.push({
        label: sbu,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        data: tlData
      }
      );
      this.compareBarChartdata = compareData;
      this.showCompareTimeChart = true;
    }
  }

  compareAccounts(nlpResult, data) {
    let labels = nlpResult.timeline;
    let accounts = nlpResult.account;
    let compareData = {
      labels: labels, datasets: [], options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    for (let account of accounts) {
      let tlData = [];
      for (let q of labels) {
        data.map(d => {
          if (d.ACCOUNT && d.ACCOUNT.toLowerCase() === account.toLowerCase() && !d.title) {
            tlData.push((d["" + q] / 1000000).toFixed(2));
          }
        });
      }
      compareData.datasets.push({
        label: account,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        data: tlData
      });
      console.log(compareData);
      this.compareBarChartdata = compareData;
      this.showCompareTimeChart = true;
    }
  }

  compareVerticals(nlpResult, data) {
    let labels = nlpResult.timeline;
    let verticals = nlpResult.vertical;
    // let revenueproperty=nlpResult.revenueProperty;
    let compareData = {
      labels: labels, datasets: [], options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    for (let vertical of verticals) {
      let tlData = [];
      for (let q of labels) {
        data.map(d => {
          if (d.VERTICAL && d.VERTICAL.toLowerCase() === vertical.toLowerCase() && !d.title) {
            tlData.push((d["" + q] / 1000000).toFixed(2));
          }
        });
      }
      compareData.datasets.push({
        label: vertical,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        data: tlData
      });
      console.log(compareData);
      this.compareBarChartdata = compareData;
      this.showCompareTimeChart = true;
    }
  }

  compareSbus(nlpResult, data) {
    let labels = nlpResult.timeline;
    let sbus = nlpResult.sbu;
    console.log(labels, sbus);
    let compareData = { labels: labels, datasets: [] };
    for (let sbu of sbus) {
      let tlData = [];
      for (let q of labels) {
        let sum = 0;
        data.map(d => {
          // console.log(q,d.sbu,sbu);
          if (d.SBU && d.SBU.toLowerCase() === sbu.toLowerCase() && !d.title) {
            tlData.push((d["" + q] / 1000000).toFixed(2));
          }
        });
        // tlData.push((sum / 1000000).toFixed(2));
      }
      compareData.datasets.push({
        label: sbu.toUpperCase(),
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        data: tlData
      });
      console.log(compareData);
      this.compareBarChartdata = compareData;
      this.showCompareTimeChart = true;
    }
  }

  getRandomColor() {
    // const letters = "0123456789ABCDEF";
    // let color = "#";
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    let color=["#FF6384","#36A2EB","#704b60","#606768","#8dea2e", "#1f6ea3","#1ea276","#a11e3a","#6b6062","#f25d13","#f1ba12","#2ed1b8","#318c3d","#e81747","#962b2b"];
    return color[Math.floor((Math.random() * 14) + 1)];
  }
}
