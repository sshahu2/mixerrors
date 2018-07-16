import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';


@Injectable()
export class GraphService {

  constructor() { }

  getLineChart(ctx, graphData) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: graphData.labels,
        datasets: graphData.datasets
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontColor: '#ffffff'
          }
        },
        scaleFontColor: 'red',
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: '#ffffff',
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: '#ffffff',
            }
          }],
        }
      }
    });
   }

   getBarChart(ctx, graphData) {
     return new Chart(ctx, {
       type : 'bar',
       data : {
         labels: graphData.labels,
         datasets: [graphData.datasets]
       },
       options: {
        legend: {
          display: true,
          labels: {
            fontColor: '#ffffff'
          }
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: '#ffffff', // this here
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: '#ffffff', // this here
            }
          }],
        }
      }
     });
   }

}
