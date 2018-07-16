import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StocksService {

  constructor( private http: HttpClient ) { }

  getStockPrice(code) {
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&' +
        'symbol=' + code + '&interval=1min&apikey=PXUJFJ9B3W9H8P8H');
  }

}
