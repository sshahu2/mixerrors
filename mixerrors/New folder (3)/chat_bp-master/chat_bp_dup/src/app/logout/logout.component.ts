import {Component,OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {URLService} from '../services/url.service';


@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
  })
export class LogoutComponent {
    didLogoutFail = false;
    message = "";
    constructor(private urlService:URLService,private http:Http,private router:Router){}
    ngOnInit(){
        this.http.get(this.urlService.getLogoutURL())
        .map((resLogout)=>resLogout.json())
        .subscribe((resLogoutJSON)=>{
            if(resLogoutJSON.success || resLogoutJSON.type=='success'){
              localStorage.clear();
              this.router.navigate(['/']);
            }else{
              this.didLogoutFail = true;
              this.message = "Logout failed! ";
            }
        })
    }
}