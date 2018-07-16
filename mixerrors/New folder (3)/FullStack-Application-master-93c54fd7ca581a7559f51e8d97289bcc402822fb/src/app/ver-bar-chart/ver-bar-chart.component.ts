import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";


@Component({
  selector: 'app-ver-bar-chart',
  templateUrl: './ver-bar-chart.component.html',
  styleUrls: ['./ver-bar-chart.component.css']
})
export class VerBarChartComponent implements OnInit {

  @ViewChild('verBarChart') verBarChart: ElementRef;
  element: any;
  @Input() data: any;
  @Input() group: any;
  barChartdata: any;

  constructor() {
  }

  ngOnInit() {
    this.element = this.verBarChart.nativeElement;
  }

  ngAfterViewInit() {
    console.log(this.data, this.group);
    let labels = [];
    let data = [];
    for (let d of this.data) {
      if (this.group.name === d.group) {
        labels.push(d.category);
        data.push(d.measure);
      }
    }
    this.barChartdata = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          data: data
        }
      ]
    };
    this.element.refresh();
  }
}
