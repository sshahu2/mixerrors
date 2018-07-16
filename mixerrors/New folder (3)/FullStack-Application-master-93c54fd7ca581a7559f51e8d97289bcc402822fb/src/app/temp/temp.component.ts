import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import * as Chart from "chart.js";
import { GraphService } from "../services/graph.service";
import { DataService } from "../services/data.service";
import { CustomizationDialogComponent } from "../customization-dialog/customization-dialog.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";
import { StocksService } from "../stock-price/stocks.service";
import { MatTableDataSource } from "@angular/material";
import { Element } from "../model/element";
import { GraphDialogComponent } from "../graph-dialog/graph-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-temp",
  templateUrl: "./temp.component.html",
  styleUrls: ["./temp.component.css"]
})
export class TempComponent implements OnInit, AfterViewInit {
  @ViewChild("doughnut") doughnut: ElementRef;
  @ViewChild("verBarChart") verBarChart: ElementRef;
  @ViewChild("accBarChart") accBarChart: ElementRef;
  @ViewChild("accTimeLineChart") accTimeLineChart: ElementRef;
  @ViewChild("compareBarChart") compareBarChart: ElementRef;
  @ViewChild("compareMultiBarChart") compareMultiBarChart: ElementRef;

  query: any;
  barChartdata: any;
  accbarChartData: any;
  accBarChartdata: any;
  accTimeLineChartdata: any;
  compareBarChartdata: any;
  compareMultiBarChartdata: any;
  showVerChart = false;
  selectedSBU: any;
  pieData: any;
  sbuData: any;
  options: any;
  pieElement: any;
  verBarElement: any;
  accBarElement: any;
  accTimeLineElement: any;
  compareBarElement: any;
  compareMultiBarElement: any;
  showAccChart = false;
  showTimeLineChart = false;
  showSbuChart = true;
  showCompareTimeChart = false;
  showMultiCompareTimeChart = false;
  nlpResult: any;
  noData = false;

  constructor(private dataService: DataService, private router: Router) {
    this.sbuData = [
      { group: "mnt", measure: 5 },
      { group: "hls", measure: 4 },
      { group: "enu", measure: 6 },
      { group: "bfsi", measure: 3 },
      { group: "cbu", measure: 8 },
      { group: "comm", measure: 2 }
    ];
    let labels = [];
    let data = [];
    for (let d of this.sbuData) {
      labels.push(d.group);
      data.push(d.measure);
    }
    this.pieData = {
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
            "#8549ba"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#00a950",
            "#58595b",
            "#8549ba"
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
        text: "SBUs Analysis"
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      pieceLabel: {
        render: "label"
      }
    };
  }

  ngOnInit() {
    this.getNlpResult();
  }

  // ngAfterContentChecked() {}

  getNlpResult() {
    this.noData = false;
    this.dataService.getSearchQuery().subscribe(query => {
      this.showSbuChart = false;
      this.showVerChart = false;
      this.showAccChart = false;
      this.showTimeLineChart = false;
      this.showCompareTimeChart = false;
      this.query = query;
      if (!query) {
        this.showSbuChart = true;
      }
      console.log(query);
      this.dataService.destructureQuery(query).subscribe(
        result => {
          this.nlpResult = result;
          console.log(this.nlpResult);
          this.showSbuChart = false;
          if (this.nlpResult.intent === "revenueCompare") {
            this.selectCompareChart(this.nlpResult);
          } else if (this.nlpResult.sbu) {
            let selectedSbu = this.nlpResult.sbu;
            this.createVerRevenue(selectedSbu);
          } else if (this.nlpResult.vertical) {
            let selectedVer = this.nlpResult.vertical;
            this.createAccRevenue(selectedVer);
          } else if (this.nlpResult.account) {
            let selectedAcc = this.nlpResult.account;
            this.createAccTimeLine(selectedAcc);
          } else {
            this.showSbuChart = true;
            // this.noData = true;
          }
        },
        err => {
          alert(
            "Oops!! Can not reach Server right now. Please try after some time."
          );
          this.showSbuChart = true;
        }
      );
    });
  }

  ngAfterViewInit() {
    try {
      this.pieElement = this.doughnut.nativeElement;
      this.verBarElement = this.verBarChart.nativeElement;
      this.accBarElement = this.accBarChart.nativeElement;
      this.accTimeLineElement = this.accTimeLineChart.nativeElement;
      this.compareBarElement = this.compareBarChart.nativeElement;
      this.compareMultiBarElement = this.compareMultiBarChart.nativeElement;
    } catch (error) {
      // console.log("Can not find native element");
    }
  }

  selectCompareChart(nlpResult) {
    console.log(nlpResult);
    if (nlpResult.timeline.length >= 0) {
      if (nlpResult.account && nlpResult.account.length >= 1) {
        this.compareAccounts(nlpResult);
      } else if (nlpResult.vertical && nlpResult.vertical.length >= 1) {
        this.compareVerticals(nlpResult);
      } else if (nlpResult.sbu && nlpResult.sbu.length >= 1) {
        this.compareSbus(nlpResult);
      }
    }
  }

  compareAccounts(nlpResult) {
    let labels = nlpResult.timeline;
    let accounts = nlpResult.account;
    let compareData = {
      labels: labels,
      datasets: []
    };
    this.dataService.getAccTimelineData().subscribe((data: Array<any>) => {
      for (let account of accounts) {
        let tlData = [];
        for (let q of labels) {
          data.map(d => {
            if (
              d.group.toLowerCase() === account.toLowerCase() &&
              d.category.toLowerCase() === q.toLowerCase()
            ) {
              tlData.push(d.measure);
            }
          });
        }
        compareData.datasets.push({
          label: account,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: tlData
        });
        console.log(compareData.datasets);
        this.compareBarChartdata = compareData;
        this.showCompareTimeChart = true;
      }
    });
  }

  compareVerticals(nlpResult) {
    let labels = nlpResult.timeline;
    let verticals = nlpResult.vertical;
    let compareData = {
      labels: labels,
      datasets: []
    };
    this.dataService.getVerticalTimeLineData().subscribe((data: Array<any>) => {
      for (let vertical of verticals) {
        let tlData = [];
        for (let q of labels) {
          data.map(d => {
            if (
              d.group.toLowerCase() === vertical.toLowerCase() &&
              d.category.toLowerCase() === q.toLowerCase()
            ) {
              tlData.push(d.measure);
            }
          });
        }
        compareData.datasets.push({
          label: vertical,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: tlData
        });
        console.log(compareData.datasets);
        this.compareBarChartdata = compareData;
        this.showCompareTimeChart = true;
      }
    });
  }

  compareSbus(nlpResult) {
    let labels = nlpResult.timeline;
    let sbus = nlpResult.sbu;
    let compareData = {
      labels: labels,
      datasets: []
    };
    this.dataService.getSbuTimeLineData().subscribe((data: Array<any>) => {
      for (let sbu of sbus) {
        let tlData = [];
        for (let q of labels) {
          data.map(d => {
            if (
              d.group.toLowerCase() === sbu.toLowerCase() &&
              d.category.toLowerCase() === q.toLowerCase()
            ) {
              tlData.push(d.measure);
            }
          });
        }
        compareData.datasets.push({
          label: sbu.toUpperCase(),
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          data: tlData
        });
        console.log(compareData.datasets);
        this.compareBarChartdata = compareData;
        this.showCompareTimeChart = true;
      }
    });
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createCompareChart() {}

  selectPie(event) {
    let selectedSbu = this.pieData.labels[event.element._index];
    let value = this.pieData.datasets[event.element._datasetIndex].data[
      event.element._index
    ];
    this.createVerRevenue(selectedSbu);
  }

  createVerRevenue(selectedSbu) {
    this.dataService.getVerRevenueData().subscribe((verdata: Array<any>) => {
      this.barChartdata = verdata;
      this.showAccChart = false;
      let labels = [];
      let data = [];
      verdata.sort(function(a, b) {
        return b.measure - a.measure;
      });
      for (let d of verdata) {
        if (selectedSbu.toString().toLowerCase() === d.group.toLowerCase()) {
          labels.push(d.category);
          data.push(d.measure);
        }
      }
      if (labels.length > 0) {
        this.showVerChart = true;
      }
      this.barChartdata = {
        labels: labels,
        datasets: [
          {
            label: selectedSbu + "'s verticals",
            backgroundColor: "#42A5F5",
            borderColor: "#1E88E5",
            data: data
          }
        ]
      };
      try {
        this.verBarElement.refresh();
      } catch (error) {
        // console.log('Error Handler : can not find refresh of undefined');
      }
    });
  }

  getAccounts(event) {
    let selectedVer = this.barChartdata.labels[event.element._index];
    let value = this.barChartdata.datasets[event.element._datasetIndex].data[
      event.element._index
    ];
    this.createAccRevenue(selectedVer);
  }

  createAccRevenue(selectedVer) {
    this.dataService.getAccRevenueData().subscribe((accdata: Array<any>) => {
      this.accbarChartData = accdata;
      let labels = [];
      let data = [];
      accdata.sort(function(a, b) {
        return b.measure - a.measure;
      });
      for (let obj of accdata) {
        if (obj.group.toLowerCase() === selectedVer.toLowerCase()) {
          labels.push(obj.category);
          data.push(obj.measure);
        }
      }
      if (labels.length > 0) {
        this.showAccChart = true;
      }
      this.accBarChartdata = {
        labels: labels,
        datasets: [
          {
            label: selectedVer + "'s accounts",
            backgroundColor: "#00a950",
            borderColor: "#00a950",
            data: data
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
      try {
        this.accBarElement.refresh();
      } catch (error) {
        // console.log('Error Handler : can not find refresh of undefined');
      }
    });
  }

  selectTopAcct(event) {
    let value = event.target.value;
    this.dataService.getAccRevenueData().subscribe((accdata: Array<any>) => {
      this.accbarChartData = accdata;
      if (value < this.accBarChartdata.datasets[0].data.length) {
        this.accBarChartdata.datasets[0].data.splice(value);
        this.accBarChartdata.labels.splice(value);
        this.accBarElement.refresh();
      }
    });
  }

  getLineChart(event) {
    let selectedAcc = this.accBarChartdata.labels[event.element._index];
    let value = this.accBarChartdata.datasets[event.element._datasetIndex].data[
      event.element._index
    ];
    this.createAccTimeLine(selectedAcc);
  }

  createAccTimeLine(selectedAcc) {
    let labels = [];
    let data = [];
    this.dataService.getAccTimelineData().subscribe((tlData: Array<any>) => {
      for (let t of tlData) {
        if (t.group.toLowerCase() === selectedAcc.toLowerCase()) {
          labels.push(t.category);
          data.push(t.measure);
        }
      }
      if (labels.length > 0) {
        this.showTimeLineChart = true;
      }
      this.accTimeLineChartdata = {
        labels: labels,
        datasets: [
          {
            label: selectedAcc + "'s Timeline Data",
            data: data,
            fill: false,
            borderColor: "#565656"
          }
        ],
        options: {
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
      try {
        this.accTimeLineElement.refresh();
      } catch (error) {
        // console.log('Error Handler : can not find refresh of undefined');
      }
    });
  }

  updateVerChart(event) {
    this.selectedSBU = event;
    this.showVerChart = true;
    console.log(event);
  }

  back() {
    this.router.navigate([""]);
  }
}
