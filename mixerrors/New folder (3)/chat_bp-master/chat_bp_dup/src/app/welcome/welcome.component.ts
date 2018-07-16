import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isBotActive=false;
  backgroundImageURL = "../assets/images/background_welcome.jpg";
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
    //open chatbox after 5 seconds when the user opens admin page
    setTimeout(()=>{
      //console.log('setting timeout')
      if(!this.isBotActive){
        this.isBotActive=true;
      }
    },5000);
  }
  toggleChatBox(){
    this.isBotActive = !this.isBotActive;
  }
  getBotURL(){
    return this.sanitizer.bypassSecurityTrustResourceUrl("/chatbox");
  }
  getBackgroundImageURL(){
    return this.backgroundImageURL;
  }
  closeChatBox(){
    this.isBotActive = false;
  }
}
