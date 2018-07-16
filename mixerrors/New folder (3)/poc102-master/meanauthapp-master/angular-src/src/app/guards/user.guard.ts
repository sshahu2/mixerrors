import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){

  }

  canActivate() {
      //var pos=this.authService.loadPosition;
    let User = JSON.parse(localStorage.getItem('user'));
      //console.log(User.position);
     if (User.position!="admin") {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
