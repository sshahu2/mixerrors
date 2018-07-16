import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {URLService} from '../services/url.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ifShowIntentNotSelected = true;
  isAdminFeedbackSubmissionFailed = false;
  isBotActive = false;
  action = "";
  actions = ['accept','reject'];
  outputActions:String[];

  intents = ["Laptop","keyboard","mouse","Salary","HRA","Linux 3.18"];
  outputIntents:String[];
  feedbacks = [];
  constructor(private urlService:URLService,private http:Http) { 
    
  }
  ngOnChanges(){
  }
  ngOnInit() {
    //open chatbox after 5 seconds when the user opens admin page
    // setTimeout(()=>{
    //   //console.log('setting timeout')
    //   if(!this.isBotActive){
    //     this.isBotActive=true;
    //   }
    // },5000);
    this.http.get(this.urlService.getAllFeedbackURL())
    .map((res)=>res.json())
    .subscribe((resJSON)=>{
      this.feedbacks = resJSON.data;
      console.log('got feedbacks:'+JSON.stringify(this.feedbacks));
      for(let i=0;i<this.feedbacks.length;i++){
        this.feedbacks[i].feedback_type= this.feedbacks[i].feedback;
      }
      //this.messages = [];
      this.initializeActionAndIntents();

      
    },
    (err)=>{
      console.log("Unable to get feedback:"+err)
    });
  }
  initializeActionAndIntents(){ // to make them point to empty string every time this.feedbacks changes
    this.outputActions = [];
    this.outputIntents = [];
    for(let i=0;i<this.feedbacks.length;i++){
      this.outputActions.push('');
      this.outputIntents.push('');
    }
  }
  handleAdminFeedbackSumit(){
    console.log("Selected actions are:");
    console.log(this.outputActions);
    console.log("Selected intents are:");
    console.log(this.outputIntents);
    //let originalFeedbacks = this.feedbacks;
    let updateFeedbacks = [];
    let updateFeedbackIndices = [];
    let remainingFeedbacks = [];

    //segregate selected and unselected feedback rows
    for(let i=0;i<this.feedbacks.length;i++){
      if(this.outputActions[i]!='' && this.outputActions[i]!=''){
        this.feedbacks[i].new_intent = this.outputIntents[i];
        this.feedbacks[i].feedback_status = this.outputActions[i];
        updateFeedbacks.push(this.feedbacks[i]); 
        updateFeedbackIndices.push(i);
      }else{
        remainingFeedbacks.push(this.feedbacks[i]);
      }
    }
    this.http.post(this.urlService.getAdminFeedbackURL(),{data:updateFeedbacks}).map((res)=>res.json())
    .subscribe((res)=>{
      if(res.success || res.type=='success'){
        this.feedbacks = remainingFeedbacks;
        this.initializeActionAndIntents();
      }else{
        this.isAdminFeedbackSubmissionFailed = true;
      }
    },
  (err)=>{
    this.isAdminFeedbackSubmissionFailed = true;
    //this.feedbacks = originalFeedbacks;
    console.log("submission failed.");
  });
  }
  acceptAction(index){
    console.log("Got approval for :"+index);
    this.outputActions[index] = 'accept';
  }
  rejectAction(index){
    console.log("Got rejection for :"+index);
    this.outputActions[index] = 'reject';
  }
  toggleChatBox(){
    this.isBotActive = !this.isBotActive;
  }
}
