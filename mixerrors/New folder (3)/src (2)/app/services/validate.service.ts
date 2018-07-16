import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import'rxjs/add/operator/map';
@Injectable()
export class ValidateService {

  constructor() { }
validateRegister(userm){
  if((userm.name==undefined)||(userm.email==undefined)||(userm.username==undefined)||(userm.password==undefined)||(userm.role==undefined)){
return false;
}else{
  return true;
}


}
 validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

}
