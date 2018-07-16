// NOT USING THIS COMPONENT

import {Component,Input,EventEmitter,Output,OnInit} from '@angular/core';
import {DataService } from '../../services/data.service';

@Component({selector:'ver-detail',
 templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.css']
})
export class VerticalsComponent implements OnInit{
     
     @Input() index; 
     //@Output()
     ver_index:any;
     tab:Boolean=false;
     data1:any;
     datas:any;
     color=["#FF6384","#36A2EB","#FFCE56","#606768","#47a55e", "#1f6ea3"];
         
  constructor(private dataservice:DataService) { }
    barEvent(event){
         this.ver_index = event.element._index;
         this.tab=true;
         console.log("new event" + this.ver_index);
    }
   
            

      ngOnInit(){
             this.datas=this.dataservice.getData();
         console.log("Initialising datas List..." +  this.datas.top[0]);
         var len=this.datas.verticals[this.datas.top[this.index]].length;
           var num=[len];
            console.log(len);
            for(var x=0;x<len;x++){
                num[x]=(Math.floor(Math.random()*100));
                
            }
           this.data1 = {
            labels: this.datas.verticals[this.datas.top[this.index]],
            datasets: [
                {
                    label: 'First Dataset',
                    data: num,
                    fill:true,
                    borderColor:this.color[this.index],
                     backgroundColor:this.color[this.index]
                }
                
            ]
        }
      } 
}
