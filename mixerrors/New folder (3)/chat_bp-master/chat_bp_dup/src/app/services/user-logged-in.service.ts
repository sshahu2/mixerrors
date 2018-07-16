import { Injectable } from '@angular/core';

@Injectable()
export class UserLoggedInService {

  constructor() { }
  isUserLoggedIn(){
    var item = localStorage.getItem("login");
    if(item==="1")
      return true;
    else
      return false;
  }
}

