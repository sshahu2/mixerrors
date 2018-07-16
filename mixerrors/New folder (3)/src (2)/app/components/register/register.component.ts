import { Component, OnInit } from '@angular/core';
import {ValidateService} from './../../services/validate.service';
import {AuthService} from './../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  role:String;

  constructor(private validateservice:ValidateService,
  private authservice:AuthService,
  private flashmessage:FlashMessagesService,
  private router:Router
  ) { }

  ngOnInit() {
  }


onRegisterSubmit(){
  const userm={
     name:this.name,
  username:this.username,
    email:this.email,
  password:this.password,
  role:this.role
  }
  if(!this.validateservice.validateRegister(userm)){
    //console.log("full details");
   this.flashmessage.show("Please fill complete details",{cssClass:'alert-danger',timeout:3000});
    return false;
  }
   if(!this.validateservice.validateEmail(userm.email)){
 //console.log("email");
     this.flashmessage.show("Correct format of email required",{cssClass:'alert-danger',timeout:3000})
    return false;
  }
  this.authservice.registerUser(userm).subscribe(data=>{
    if(data.success && (data.userm.role=="User")){
     this.flashmessage.show("you are registered",{cssClass:'alert-success',timeout:3000});
     this.router.navigate(['/login']);
    }
   else if(data.success && (data.userm.role=="Admin"))
   {
     this.flashmessage.show("you are registered",{cssClass:'alert-success',timeout:3000});
     this.router.navigate(['/adminlogin']);
    }
    else{
      this.flashmessage.show("you are not  registered",{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['/register']);
    }
  })
}
}