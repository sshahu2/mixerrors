import { Component, OnInit } from '@angular/core';
import { StocksService } from './stocks.service';

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.css']
})
export class StockPriceComponent implements OnInit {

  dateTime: string;
  wiproStock = null;

  constructor( private stockService: StocksService ) { }

  ngOnInit() {
    this.setDateAndTime();
    this.setWiproStock();
   }

  setDateAndTime() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'];
    setInterval(function() {
      const d = new Date();
      document.getElementById('dateTime').innerHTML = 'NYSE (WIT) '+month[d.getMonth()] + ' '
      + d.getDate() + ',' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' IST';
    }, 1000);
  }

  setWiproStock() {
    let wiproStockPrice = null; let previousPrice: any; let difference: any; let diffPercent: any;
    let currentprice: any;
    this.stockService.getStockPrice('WIT').subscribe((data) => {
      wiproStockPrice = data['Time Series (Daily)'];
      const keys = Object.keys(wiproStockPrice);
      currentprice = Number(wiproStockPrice[keys[0]]['4. close']).toFixed(2);
      previousPrice = Number(wiproStockPrice[keys[1]]['4. close']).toFixed(2);
      difference = previousPrice - currentprice;
      diffPercent = (difference * 100) / previousPrice;
        document.getElementById('wiproStockPrice').innerHTML =  currentprice + ' USD '
        + ((difference >= 0) ? '<i class="material-icons arrow-up">arrow_upward</i> '
        : '<i class="material-icons arrow-down">arrow_downward</i> ')
        + difference.toFixed(3) + '$ (' + diffPercent.toFixed(2) + '%)';
      console.log(wiproStockPrice[keys[0]], keys[0], difference);
    });
  }

  getCompetitorsStocks() {

  }

}
