import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { trigger, state, style, transition,animate, group, query, stagger, keyframes} from '@angular/animations'; 
import { PredictionService } from '../services/prediction.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[ trigger('routerAnimation',[
    transition('1 => 2',[
      style({height:'!'}),
      query(':enter',style({transform:'translateX(100%)'})),
      query(':enter,:leave',style({position:'absolute',top:0,left:0,right:0})),
      group([
      query(':leave',[animate('0.6s cubic-bezier(0.35,0,0.25,1)',style({transform:'translateX(-100%)'}))]),
       query(':enter',[animate('0.6s cubic-bezier(0.35,0,0.25,1)',style({transform:'translateX(0)'}))])
      ])
    ]),
    transition('2 => 1',[
      style({height:'!'}),
      query(':enter',style({transform:'translateX(-100%)'})),
      query(':enter,:leave',style({position:'absolute',top:0,left:0,right:0})),
      group([
      query(':leave',[animate('0.6s cubic-bezier(0.35,0,0.25,1)',style({transform:'translateX(100%)'}))]),
       query(':enter',[animate('0.6s cubic-bezier(0.35,0,0.25,1)',style({transform:'translateX(0)'}))])
      ])
    ])
])
]
})
export class HomeComponent implements OnInit, AfterContentChecked {
    entityList:any;
  showNav = false;
  constructor( private predictService: PredictionService) {  }

  ngOnInit() {
    console.log("inside the home page");
    this.predictService.getAllEntityListApi().subscribe((data)=>{
          this.entityList = data;
          console.log("this is the home page :",this.entityList[0]);
    this.predictService.setAllEntities(this.entityList);
  })

   }

  ngAfterContentChecked() {
    sessionStorage.getItem('user') ? this.showNav = true : this.showNav = false;
  }

  getDepth(outlet){
    return outlet.activatedRouteData['depth'];
  }
  
}
