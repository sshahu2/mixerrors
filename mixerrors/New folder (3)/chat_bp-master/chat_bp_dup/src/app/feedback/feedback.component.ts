import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {URLService} from '../services/url.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  // stars management
  unselectedStarUrl = "../assets/images/star_unselected.jpeg";
  selectedStarUrl = "../assets/images/star_selected.jpeg";
  urls:string[];
  stars:number[];
  starsCount = 5;
  selectedStar:number=-1; // stars given as feedback
  isWhite:boolean[] = [true,true,true,true,true]; //show all stars as white initially
  //comments
  comments:string;
  constructor(private http:Http,private urlService:URLService,private router:Router) {
    this.stars = [];
    this.urls = []
    
    for(let i=0;i<this.starsCount;i++){
      this.stars.push(i+1);
      this.urls.push(this.unselectedStarUrl);
    }
   }

  ngOnInit() {
    
  }
  setFeedback(value){
    this.selectedStar = value;
    for(let i=0;i<this.starsCount;i++){
      if(i<value){
        this.urls[i] = this.selectedStarUrl;
        this.isWhite[i] = false;
      }
      else{
          this.urls[i] = this.unselectedStarUrl;
          this.isWhite[i] = true;
      }
    }
  }
  submitOverallFeedback(){
    console.log('given stars'+this.selectedStar+", comments:"+this.comments);
    let data = {
      stars:this.selectedStar,
      comments:this.comments
    };
    //submit data to the overall feedback url
    this.http.post(this.urlService.getOverallFeedbackURL(),data).map(res=>res.json())
    .subscribe(
      (success)=>{
        alert("Feedback submitted.")
        localStorage.removeItem('messages');
        this.router.navigate(['/welcome']); 
      },
      (err)=>{
        alert("failed to submit feedback! ("+err+")");
        console.log('Error: '+err);
      }
    )
  }

}
