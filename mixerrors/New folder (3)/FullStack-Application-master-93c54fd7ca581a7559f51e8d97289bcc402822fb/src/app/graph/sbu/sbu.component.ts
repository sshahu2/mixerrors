import {Component,OnInit} from '@angular/core';
import {DataService } from '../../services/data.service';

@Component({
      selector: 'sbu-graph',
  templateUrl: './sbu.component.html',
  styleUrls: ['./sbu.component.css']
})
export class SbuGraphComponent implements OnInit {
    vertical:Boolean;
    arr:any[];
    labeling:any;
    datas:any;
    data: any;
    data1:any;
    color=["#FF6384","#36A2EB","#FFCE56","#606768","#47a55e", "#1f6ea3"];

 selectData(event) {
         this.labeling = event.element._index ;
         this.vertical = true;
         var len = this.datas.verticals[this.datas.top[event.element._index]].length;
         var num = [len];
            
            for(var x=0;x<len;x++){
                num[x]=(Math.floor(Math.random()*100));
            }
        this.data1 = {
            labels: this.datas.verticals[this.datas.top[event.element._index]],
            datasets: [
                {
                    label:this.datas.top[event.element._index ] ,
                    data: num,
                    fill:true,
                    borderColor:this.color[event.element._index],
                    backgroundColor:this.color[event.element._index]
                }
                
            ]
        }

        
}

    constructor(private dataservice:DataService) { }
    ngOnInit(){
        this.datas=this.dataservice.getData();
        console.log("Initialising datas List..." +  this.datas.top);
        this.data = {
            labels: this.datas.top,
            datasets: [
                {
                    data: [300, 50, 100,120,45,99],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                       "#606768",
                       "#47a55e",
                       "#1f6ea3"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                         "#3c4344",
                         "#328c48",
                         "#185f8e"
                    ]
                }]    
            };
    }
}