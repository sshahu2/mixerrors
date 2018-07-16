import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserLoggedInService} from '../services/user-logged-in.service';
@Injectable()
export class LoggedInAuthGaurd implements CanActivate{
    constructor(private userLoggedInService: UserLoggedInService,private routerApp:Router){}
    canActivate( router: ActivatedRouteSnapshot,state: RouterStateSnapshot){
        if(this.userLoggedInService.isUserLoggedIn())
            return true;
        else
        {
            this.routerApp.navigate(['/']);
            return false;
        }
    }
}
