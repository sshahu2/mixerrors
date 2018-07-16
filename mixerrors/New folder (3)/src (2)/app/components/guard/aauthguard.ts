import{Injectable } from "@angular/core";
import {Router,CanActivate} from "@angular/router";
import {AuthService} from './../../services/auth.service';
@Injectable()
export class AauthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){

    }
    canActivate(){
        if(this.authService.aloggedIn()){
            return true;
        }
        else{
            this.router.navigate(['/adminlogin']);
            return false;
        }
    }
   
    
}