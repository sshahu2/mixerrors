import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chart from 'chart.js';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-dashboard-1',
  templateUrl: './dashboard-1.component.html',
  styleUrls: ['./dashboard-1.component.css']
})
export class Dashboard1Component implements OnInit,AfterViewInit {
  data:any[]=[];
  time:String[]=["4","5","6", "7", "8"];
  city:String[]=["Bangaluru","Tumakur","Chitradurga","Hubli","Belgaum"];
  vehicle:String[]=["HMV","LMV","Bus","Car","Bike"];
  myChart:any;
  options = ["time", "city", "vehicle"];
  default="time";
  x:String[]=[];
  e:String;
  tollTax:Number[];
optionSelected: String="time";

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.authService.getData().subscribe(
      res => {
        this.data = res,
        this.e="time";
         console.log("time batao  "+this.time);
    this.tollTax=[0,0,0,0,0];
    for(var i=0;i<this.data.length;i++)
    {
      console.log("Length "+this.data.length);
        if(this.data[i].Hour==4)
        {
          this.tollTax[0]+=this.data[i].Toll_Tax;

        }
        else if(this.data[i].Hour==5)
        {
          this.tollTax[1]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==6)
        {
          this.tollTax[2]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==7)
        {
          this.tollTax[3]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==8)
        {
          this.tollTax[4]+=this.data[i].Toll_Tax;
        }
    }
    this.x=this.time;
    console.log("kyaa be "+this.tollTax);
     this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.time,
          datasets: [{
              label: '# of Votes',
              data: this.tollTax,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(225, 206, 86, 1)',
                  'rgba(255, 055, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
      },
      (error) => { console.log(error) }
    );
    
  }
   canvas: any;
  ctx: any;
  ngAfterViewInit() {
   
  }
  onOptionsSelected(event){
 console.log(event); //option value will be sent as event
 
 if(event=="city")
    { 
      document.getElementById("demo").innerHTML = "city v/s Toll Tax";
    this.tollTax=[0,0,0,0,0];
    this.x=this.city;
    this.e="city";
    for(var i=0;i<this.data.length;i++)
    {
      console.log("Length "+this.data.length);
        if(this.data[i].City=="Bangalore")//"Bangaluru","Tumakur","Chitradurga","Hubli","Belgaum"
        {
          this.tollTax[0]+=this.data[i].Toll_Tax;

        }
        else if(this.data[i].City=="Tumakur")
        {
          this.tollTax[1]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].City=="Chitradurga")
        {
          this.tollTax[2]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].City=="Hubli")
        {
          this.tollTax[3]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].City=="Belgaum")
        {
          this.tollTax[4]+=this.data[i].Toll_Tax;
        }
    }
    console.log("kyaa be "+this.tollTax);
    this.myChart.data= {
          labels: this.city,
          datasets: [{
              label: '# of Votes',
              data: this.tollTax,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(225, 206, 86, 1)',
                  'rgba(255, 055, 86, 1)'
              ],
              borderWidth: 1
          }]
      }
    this.myChart.update();
    }
    else if(event=="time")
    {
      document.getElementById("demo").innerHTML = "time v/s Toll Tax";
      console.log("time batao  "+this.time);
    this.tollTax=[0,0,0,0,0];
    this.x=this.time;
    this.e="time";
    for(var i=0;i<this.data.length;i++)
    {
      console.log("Length "+this.data.length);
        if(this.data[i].Hour==4)
        {
          this.tollTax[0]+=this.data[i].Toll_Tax;

        }
        else if(this.data[i].Hour==5)
        {
          this.tollTax[1]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==6)
        {
          this.tollTax[2]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==7)
        {
          this.tollTax[3]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Hour==8)
        {
          this.tollTax[4]+=this.data[i].Toll_Tax;
        }
    }
    console.log("kyaa be "+this.tollTax);
     this.myChart.data= {
          labels: this.city,
          datasets: [{
              label: '# of Votes',
              data: this.tollTax,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(225, 206, 86, 1)',
                  'rgba(255, 055, 86, 1)'
              ],
              borderWidth: 1
          }]
      }
    this.myChart.update();
    
    }
    else if(event=="vehicle")
    {
      document.getElementById("demo").innerHTML = "vehicle v/s Toll Tax";
        this.tollTax=[0,0,0,0,0];
        this.x=this.vehicle;
        this.e="vehicle";
    for(var i=0;i<this.data.length;i++)
    {
      console.log("Length "+this.data.length);
        if(this.data[i].Type_of_Vechile=="HMV")//"Bangaluru","Tumakur","Chitradurga","Hubli","Belgaum"
        {
          this.tollTax[0]+=this.data[i].Toll_Tax;

        }
        else if(this.data[i].Type_of_Vechile=="LMV")
        {
          this.tollTax[1]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Type_of_Vechile=="Bus")
        {
          this.tollTax[2]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Type_of_Vechile=="Bike")
        {
          this.tollTax[3]+=this.data[i].Toll_Tax;
        }
        else if(this.data[i].Type_of_Vechile=="Car")
        {
          this.tollTax[4]+=this.data[i].Toll_Tax;
        }
    }
    console.log("kyaa be 1"+this.tollTax);
    this.myChart.data= {
          labels: this.vehicle,
          datasets: [{
              label: '# of Votes',
              data: this.tollTax,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(225, 206, 86, 1)',
                  'rgba(255, 055, 86, 1)'
              ],
              borderWidth: 1
          }]
      }
    this.myChart.update();
    }
    

}
sendmail(){
  var reslt:String=document.getElementById("demo").innerHTML;
  var opt:String;
  const res={
   resl:reslt,
   opt:this.optionSelected
  };
  
  console.log(reslt);
  //var TextInsideLi = res.getElementsByTagName('p')[0].innerHTML;
  this.authService.sendemail(res).subscribe(
      (success) => {console.log("hiiii"+reslt)
      },
      (error) => console.log(error)
    );
}
title: string = 'My first AGM project';
  lat1: number = 12.9716;
  lng1: number = 77.5946;
  zoom: number = 5;
  /*clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }*/
  markers:marker[]=[
    {
      name:'T1',
      lat:12.9716,
      lng:77.5946,
      draggable:true
    },
    {
      name:'T2',
      lat:13.3392,
      lng:77.1140,
      draggable:true
    },
    {
      name:'T3',
      lat:14.1823,
      lng:76.5488,
      draggable:true
    },
    {
      name:'T4',
      lat:15.3647,
      lng:75.1240,
      draggable:true
    },
    {
      name:'T5',
      lat:15.8497,
      lng:74.4977,
      draggable:true
    }
  ];
 
}
 interface marker{
    name?:string;
    lat:number;
    lng:number;
    draggable:boolean;
  }
