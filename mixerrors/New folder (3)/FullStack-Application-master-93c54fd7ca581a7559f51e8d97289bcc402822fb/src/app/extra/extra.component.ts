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
  selector: 'extra-root',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent {
  
    version = VERSION;
  
    graphDialogRef: MatDialogRef<GraphDialogComponent>;

  constructor(private graphService: GraphService,
    private dataService: DataService,
    private dialog: MatDialog,
    private stockService: StocksService,
    private graphdialog: MatDialog) {}

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

  data:any;
  ngAfterViewInit() {
    this.dataService.getAnalysisGraphs().subscribe(data => {
      if (data) {
        this.data = data;
        this.setDateAndTime();
        this.setWiproStock();
        this.getCompetitorsStocks();
        // this.createGraphs();
      }
    });
  }
  
}