import {Component,OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {URLService} from '../services/url.service';
import {UserLoggedInService} from '../services/user-logged-in.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
export class NavbarComponent {
    didLogoutFail = false;
    isLoggedIn = false;
    message = "";
    constructor(private urlService:URLService
        ,private http:Http,
        private router:Router,
        private userLoggedInService:UserLoggedInService
    ){}
    ngOnInit(){
        if(this.userLoggedInService.isUserLoggedIn()){
            this.isLoggedIn = true;
        }else{
            this.isLoggedIn=false;
        }
    }
    logout(){
        this.http.get(this.urlService.getLogoutURL())
        .map((resLogout)=>resLogout.json())
        .subscribe((resLogoutJSON)=>{
            if(resLogoutJSON.success){
            localStorage.clear();
            this.router.navigate(['/']);
            }else{
            this.didLogoutFail = true;
            this.message = "Logout failed! ";
            }
        })
    }
}