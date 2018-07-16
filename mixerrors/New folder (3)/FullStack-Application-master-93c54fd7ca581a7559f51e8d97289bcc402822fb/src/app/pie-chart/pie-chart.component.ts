import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter
} from "@angular/core";
// import * as d3 from "d3";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {

  @ViewChild("doughnut") doughnut: ElementRef;
  @Output() selectSBU = new EventEmitter<any>();
  sbuData: any;
  data: any;
  options: any;

  constructor() {
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
    this.data = {
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
        text: "Chart.js Doughnut Chart"
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    };
    console.log(this.data);
    // this.doughnut.refresh();
  }

  ngOnInit() {
  }

  selectPie(event) {
    let selectedSbu = this.data.labels[event.element._index];
    let value = this.data.datasets[event.element._datasetIndex].data[
      event.element._index
    ];
    this.selectSBU.emit({ sbu: selectedSbu, value: value });
  }

}
