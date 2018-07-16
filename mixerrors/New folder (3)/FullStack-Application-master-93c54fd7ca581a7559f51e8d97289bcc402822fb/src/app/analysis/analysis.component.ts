import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked
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


@Component({
	
  selector: "app-analysis",
 
	 templateUrl: "./analysis.component.html",
 
	 styleUrls: ["./analysis.component.css"]
})

export class AnalysisComponent
  implements OnInit, AfterContentChecked, AfterViewInit {
	
  customers = [
    { value: "LBG", viewValue: "LBG" },
    { value: "CISCO", viewValue: "CISCO" },
    { value: "Capital One", viewValue: "Capital One" },
    { value: "Citi Bank", viewValue: "Citi Bank" },
    { value: "Apple", viewValue: "Apple" }
  ];
  ELEMENT_DATA: Element[] = [
    { customerName: "Cisco", stockValue: "$999", viewMore: "See more" },
    { customerName: "Microsoft", stockValue: "$1999", viewMore: "See more" },
    { customerName: "Cisco", stockValue: "$999", viewMore: "See more" },
    { customerName: "ABB", stockValue: "$1999", viewMore: "See more" },
    { customerName: "Halibortn", stockValue: "$999", viewMore: "See more" },
    { customerName: "Diversy", stockValue: "$1999", viewMore: "See more" },
    { customerName: "Horman", stockValue: "$999", viewMore: "See more" },
    { customerName: "Apple", stockValue: "$1999", viewMore: "See more" },
    { customerName: "BOA", stockValue: "$999", viewMore: "See more" },
    { customerName: "Xoserve", stockValue: "$1999", viewMore: "See more" }
  ];

  displayedColumns = ["customerName", "stockValue", "viewMore"];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  version = VERSION;

  graphDialogRef: MatDialogRef<GraphDialogComponent>;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  lineChart: any;
  newlyAddedChart: any;
  overrunChart: any;
  linectx: any;
  newlyAddedCtx: any;
  overrunCtx: any;
  visibleList: any;

  topCustomer = "LBG";

  graphData: any;
  flag = true;

  allGraphs: any;

  allCards: any;

  widgetNames: any = [
    "New Client",
    "Sales",
    "Wipro Stocks Chart",
    "Wipro vs Competitors Stock Analysis"
  ];

  widgetMenu: any = [];

  customeDialogRef: MatDialogRef<CustomizationDialogComponent>;

  data: any;

  constructor(
    private graphService: GraphService,
    private dataService: DataService,
    private dialog: MatDialog,
    private stockService: StocksService,
    private graphdialog: MatDialog
  ) {
    this.allGraphs = [
      {
        id: "top5chart",
        text: "Top 5 Customers Analysis",
        show: true
      },
      {
        id: "newlyadded",
        text: "Top 10 Newly Added Customers",
        show: true
      },
      {
        id: "overrun",
        text: "Top Project Overrun and Underrun",
        show: true
      }
    ];
  }

  ngOnInit() {
    this.allCards = document.getElementsByClassName("stock-card");
    for (let i = 0; i < this.widgetNames.length; i++) {
      this.widgetMenu.push({
        widgetName: this.widgetNames[i],
        card: this.allCards[i]
      });
    }
  }

  ngAfterContentChecked() {
    if (this.flag) {
      this.dataService.getSelectedChart().subscribe(data => {
        this.visibleList = data;
        if (this.visibleList !== []) {
          // console.log(this.visibleList);
          this.flag = false;
        }
      });
    }
  }

  setDateAndTime() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    
      setInterval(function() {
        try {
        const d = new Date();
          document.getElementById("dateTime").innerHTML =
          "NYSE (WIT) " +
          month[d.getMonth()] +
          " " +
          d.getDate() +
          "," +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds() +
          " IST";
        } catch (error) {
          // console.log("Error Handler : Can not find innerHTML of Undefined");
        }
        
      }, 1000);
    
  }

  setWiproStock() {
    let wiproStockPrice = null;
    let previousPrice: any;
    let difference: any;
    let diffPercent: any;
    let currentprice: any;
    this.stockService.getStockPrice("WIT").subscribe(data => {
      wiproStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(wiproStockPrice);
      currentprice = Number(wiproStockPrice[keys[0]]["4. close"]).toFixed(2);
      previousPrice = Number(wiproStockPrice[keys[1]]["4. close"]).toFixed(2);
      difference = previousPrice - currentprice;
      diffPercent = difference * 100 / previousPrice;
      document.getElementById("wiproStockPrice").innerHTML =
        currentprice +
        " USD " +
        (difference >= 0
          ? '<i class="material-icons arrow-up">arrow_upward</i> '
          : '<i class="material-icons arrow-down">arrow_downward</i> ') +
        difference.toFixed(3) +
        "$ (" +
        diffPercent.toFixed(2) +
        "%)";
      // console.log(wiproStockPrice[keys[0]], keys[0], difference);
    });
  }

  openGraphDialog(graph) {
    this.graphDialogRef = this.dialog.open(GraphDialogComponent, {
      height: "500px",
      width: "800px",
      data: {
        graph: graph ? graph : ""
      }
    });
  }

  getCompetitorsStocks() {
    this.stockService.getStockPrice("INFY").subscribe(data => {
      const infyStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(infyStockPrice);
      const currentprice = Number(infyStockPrice[keys[0]]["4. close"]).toFixed(
        2
      );
      document.getElementById("infyStockPrice").innerHTML =
        currentprice + " USD ";
    });
    this.stockService.getStockPrice("CTSH").subscribe(data => {
      const infyStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(infyStockPrice);
      const currentprice = Number(infyStockPrice[keys[0]]["4. close"]).toFixed(
        2
      );
      document.getElementById("ctsStockPrice").innerHTML =
        currentprice + " USD ";
    });
    this.stockService.getStockPrice("TCS").subscribe(data => {
      const infyStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(infyStockPrice);
      const currentprice = Number(infyStockPrice[keys[0]]["4. close"]).toFixed(
        2
      );
      document.getElementById("tcsStockPrice").innerHTML =
        currentprice + " USD ";
    });
    this.stockService.getStockPrice("ACN").subscribe(data => {
      const infyStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(infyStockPrice);
      const currentprice = Number(infyStockPrice[keys[0]]["4. close"]).toFixed(
        2
      );
      document.getElementById("accStockPrice").innerHTML =
        currentprice + " USD ";
    });
  }

  ngAfterViewInit() {
    this.dataService.getAnalysisGraphs().subscribe(data => {
      if (data) {
        this.data = data;
        this.setDateAndTime();
        this.setWiproStock();
        this.getCompetitorsStocks();
        this.createGraphs();
      }
    });
    // this.createGraphs();
    // this.setDateAndTime();
    // this.setWiproStock();
    // this.getCompetitorsStocks();
  }

  close(id) {
    this.allGraphs.map(graph => {
      if (graph.id === id) {
        graph.show = false;
      }
    });
  }

  createGraphs() {
    const lbgChart: any = document.getElementById("lbg");
    const lbgctx = lbgChart.getContext("2d");
    const lbgGraphData = this.data.graphData[0].graphs[0];

    const lbg = this.graphService.getLineChart(lbgctx, lbgGraphData);

    const ciscoChart: any = document.getElementById("cisco");
    const ciscoctx = ciscoChart.getContext("2d");
    const ciscoGraphData = this.data.graphData[0].graphs[1];

    const cisco = this.graphService.getLineChart(ciscoctx, ciscoGraphData);

    const cosChart: any = document.getElementById("cos");
    const cosctx = cosChart.getContext("2d");
    const cosGraphData = this.data.graphData[0].graphs[2];

    const cos = this.graphService.getLineChart(cosctx, cosGraphData);

    const citiChart: any = document.getElementById("citi");
    const citictx = citiChart.getContext("2d");
    const citiGraphData = this.data.graphData[0].graphs[3];

    const citi = this.graphService.getLineChart(citictx, citiGraphData);

    const appleChart: any = document.getElementById("apple");
    const applectx = appleChart.getContext("2d");
    const appleGraphData = this.data.graphData[0].graphs[4];

    const apple = this.graphService.getLineChart(applectx, appleGraphData);

    this.newlyAddedChart = document.getElementById("newlyadded");
    this.newlyAddedCtx = this.newlyAddedChart.getContext("2d");
    const newGraphData = this.data.graphData[1].graphs[0];

    const myChart2 = this.graphService.getBarChart(
      this.newlyAddedCtx,
      newGraphData
    );

    this.overrunChart = document.getElementById("overrun");
    this.overrunCtx = this.overrunChart.getContext("2d");
    const overrunGraphData = this.data.graphData[2].graphs[0];

    const myChart3 = this.graphService.getBarChart(
      this.overrunCtx,
      overrunGraphData
    );
  }

  onChange(value) {
    this.topCustomer = value;
    // console.log(value);
  }

  openCustomizeDialog() {
    this.flag = true;
    this.customeDialogRef = this.dialog.open(CustomizationDialogComponent, {
      height: "fit-content",
      width: "fit-content"
    });
  }

  toggle(selectchart) {
    // console.log(selectchart.id);
    this.allGraphs.map(chart => {
      if (chart.id === selectchart.id) {
        chart.show = !chart.show;
      }
    });
  }

  getCustomerStock() {
    this.stockService.getStockPrice("LLOY").subscribe(data => {
      const lbgStockPrice = data["Time Series (Daily)"];
      const keys = Object.keys(lbgStockPrice);
      const currentprice = Number(lbgStockPrice[keys[0]]["4. close"]).toFixed(
        2
      );
      document.getElementById("lbgStockPrice").innerHTML =
        currentprice + " USD ";
    });
  }

  toggleCard(widgetCard) {
    let card;
    this.widgetMenu.map(widget => {
      if (widget.widgetName === widgetCard) {
        card = widget.card;
      }
    });
    card.style.display === "none"
      ? (card.style.display = "inline")
      : (card.style.display = "none");
  }

  submit() {
    // this.dataService.setSelectedChart(this.allGraphs);
    // console.log(this.allGraphs);
  }
}
