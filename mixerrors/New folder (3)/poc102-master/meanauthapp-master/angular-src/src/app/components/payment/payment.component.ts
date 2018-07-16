import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  a: Number = 4;
  arr = [1, 2, 3];
  constructor(private authService: AuthService,private _zone: NgZone,
    private router: Router) { }

  ngOnInit() {
  }
  /*close() {
    console.log("hiiii")
    var elem = document.getElementById("pan");
    elem.style.display = "none";
    this.a = 6;
  }
  close1() {
    console.log("hiiii")
    var elem = document.getElementById("pan1");
    elem.style.display = "none";
    this.a = 6;
  }
  close2() {
    console.log("hiiii")
    var elem = document.getElementById("pan2");
    elem.style.display = "none";
    this.a = 6;
  }*/
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;
  res:any;
 getToken() {
    this.message = 'Loading...';
    
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      
      cvc: this.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.id}.`;
          var token=`${response.id}`;
          var cardType = `${response.card.brand}`;
          console.log("CARD TYPE"+cardType);
          this.res={
            stripeEmail:"barman.starlord@gmail.com",
            stripeToken:token
          };
          
          console.log("kya res"+token);
          //this.router.navigate(['dashboard_1']);
          /* this.authService.pay(this.res).subscribe(
      (success) => {
      this.router.navigate(['dashboard_1']);
      },
      (error) => console.log(error)
    )*/;
        } else {
          this.message = response.error.message;
        }
      });
    });
  }
  values = '';
  imgURL="";
  onKey(event: any) { // without type info
    this.values= event.target.value;
    
    if(this.values.startsWith("4"))
    {console.log("Visa");
     this.imgURL="https://www.seeklogo.net/wp-content/uploads/2016/11/visa-logo-preview.png";
    }
    else if(this.values.startsWith("5"))
    this.imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2000px-Mastercard-logo.svg.png";
     else if(this.values.startsWith("3"))
    this.imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png";
    
}
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

 
}
