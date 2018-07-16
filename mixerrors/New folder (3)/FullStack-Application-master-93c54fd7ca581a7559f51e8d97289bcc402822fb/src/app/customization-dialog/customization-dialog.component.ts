import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customization-dialog',
  templateUrl: './customization-dialog.component.html',
  styleUrls: ['./customization-dialog.component.css']
})
export class CustomizationDialogComponent implements OnInit {

  checked = false;

  allGraphs = [
    {
      "id" : 'top5chart',
      "text" : 'Top 5 Customers Analysis',
      "show" : true
    },
    {
      "id" : 'newlyadded',
      "text" : 'Top 10 Newly Added Customers',
      "show" : true
    },
    {
      "id" : 'overrun',
      "text" : 'Top Project Overrun and Underrun',
      "show" : true
    }
  ];

  constructor(private dialogRef: MatDialogRef<CustomizationDialogComponent>,
                private dataService: DataService) { }

  ngOnInit() {  }

  toggle(selectchart) {
    console.log(selectchart.id);
    this.allGraphs.map((chart) => {
      if (chart.id === selectchart.id) {
        chart.show = !chart.show;
      }
    });
  }

  submit() {
    this.dataService.setSelectedChart(this.allGraphs);
    console.log(this.allGraphs);
  }

}
