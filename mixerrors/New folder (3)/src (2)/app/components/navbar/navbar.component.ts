import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
content:any;
  constructor(public authService:AuthService,
    private flashmessage:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.content);

  }
  onLogoutClick(){
    this.authService.logout()
      this.flashmessage.show("you are logged out",{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['login']);
          return false;
    
    }
    onaLogoutClick(){
    this.authService.alogout()
      this.flashmessage.show("you are logged out",{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['adminlogin']);
          return false;
    
    }
    showHome(){
        if(this.authService.loggedIn()== true ||this.authService.aloggedIn() == true)
            return true;
        else
            return false;
    }

}
