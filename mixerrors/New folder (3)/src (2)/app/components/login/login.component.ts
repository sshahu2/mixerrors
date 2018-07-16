import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:String;
password:String;
  constructor( private authservice:AuthService,
  private flashmessage:FlashMessagesService,
  private router:Router) { }

  ngOnInit() {
  }
onLoginSubmit(){
  const userm={
    username:this.username,
    password:this.password
  }
  this.authservice.authenticateUser(userm).subscribe(data=>{
    //console.log(data);
if(data.success && (data.userm.role=="User")){
  this.authservice.storeUserData(data.token,data.userm);
  this.flashmessage.show("you are logged in",{cssClass:'alert-success',timeout:3000});
      this.router.navigate(['/about']);


}
 else {
      this.flashmessage.show("you are not logged in",{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['/login']);
}


  });
}
}
