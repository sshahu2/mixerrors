import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor (private authService:AuthService, private router:Router){

  }

  canActivate() {
      let User = JSON.parse(localStorage.getItem('user'));
      //console.log(User.position);
     if (User.position=="admin") {
      return true;
    }
    this.router.navigate(['/dashboard_1']);
    return false;
  }
  }

