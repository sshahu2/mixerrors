import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {URLService} from '../services/url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:String = "";
  didLoginFail = false;
  username:String="";
  password:String="";
  isSubmitDisabled = true;
  constructor(private router:Router,
              private http:Http,
              private urlService:URLService
              ) { }
  ngOnChanges(){
    if(this.password!=""){
      this.isSubmitDisabled = false;
    }else{
      this.isSubmitDisabled = true;
    }
  }
  ngOnInit() {
  }
  

  ngAfterViewChecked(){
    // console.log(this.username);
    // console.log(this.password);
  }
  setLoginState(state){
    if(state){
      localStorage.setItem("login","1");
    }
    else{
      localStorage.setItem("login","0");
    }
  }
  onLoginSubmit(){
    //console.log("login clicked");
    // this.didLoginFail = false;
    // var loginURL = this.urlService.getLoginURL();
    // console.log("login url is:"+loginURL);
    // this.http.post(loginURL,{username:this.username,password:this.password})
    // .map((res)=>res.json())
    // .subscribe((resJSON)=>{ 
    //   console.log("response from server:"+JSON.stringify(resJSON));
    //   if(resJSON.success){
    //     console.log('login successful');
    //     this.setLoginState(true);
    //     console.log('user is:'+JSON.stringify(resJSON.user));
    //     localStorage.setItem('session_key',resJSON.session_key);
    //     localStorage.setItem('currentUser',JSON.stringify(resJSON.user));
        this.router.navigate(['/welcome']);
    //   }
    //   // else{
    //   //   this.setLoginState(false);
    //   //   this.message="Login failed! Credentials incorrect.";
    //   //   this.didLoginFail = true;
    //   //   return false;
    //   }
    // }
    // ,(err)=>{
    //   console.log(err);
    //   this.setLoginState(false);
    //   this.message = "Login failed due to error: "+err;
    //   this.didLoginFail = true;
    //   return false;
    // });
  }
  
}
