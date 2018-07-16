import { Component,OnInit } from '@angular/core';
import {DataService } from '../services/data.service';

@Component({
  selector: 'table-root',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

     data:any = [];

     constructor(private dataservice:DataService) {
       
    }
    ngOnInit(){
        let d = this.dataservice.getData().top;
        d.map(a => {
            this.data.push({'sbu':a, 'rev': Math.floor(Math.random()*100)});
        });
        // this.data = this.dataservice.getData().top;
        // console.log("Initialising datas List..." +  this.data.top[0]);
    }
}