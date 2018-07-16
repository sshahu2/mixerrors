import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any[] = [];
  name: string;
  username: string;
  email: string;
  position: string;
  userN:String;
  Position: string[] = ["admin", "RTO", "Clerk", "Default"];
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  person: any[] = [];
  ngOnInit() {
    this.authService.getAllUser().subscribe(
      res => {
        this.user = res,
          console.log(this.user);
      },
      (error) => { console.log(error) }
    );

  }
  edit(u) {
    console.log("hiiii" + u);
    this.userN=u;
    this.authService.geteditable(u).subscribe(
      res => {
        this.person = res,
          console.log(this.person);
      },
      (error) => { console.log(error) }
    )

  }
  onSubmit(formValue: any) {
    console.log("Hiiiiii5"+this.userN);
    let updatedUser = {
      name: formValue.name,
      email: formValue.email,
      username: this.userN,
      position: formValue.position
    };
    this.authService.updateUser(updatedUser).subscribe(
      (success) => this.authService.getAllUser().subscribe(
      res => {
        this.user = res,
          console.log(this.user);
      },
      (error) => { console.log(error) }
    ),
      (error) => console.log(error)
    );
    //let dis:string="modal";
    //document.getElementById("sub").setAttribute("data-dismiss","modal");
    //this.router.navigate(['profile']);
    //this.router.navigate(['dashboard'])
    document.getElementById('closeEdit').click();
  }
  deleteIt(u) {
    /* this.authService.deleteUser(u).subscribe(
       res => {
         this.person = res,
           console.log(this.person);
       },
       (error) => { console.log(error) }
     )*/
    this.authService.deleteUser(u).subscribe(
      (data: any) => this.authService.getAllUser().subscribe(
        res => {
          this.user = res,
            console.log(this.user);
        },
        (error) => { console.log(error) }
      ),
      (error) => console.log(error)
    );

  }
  updateData(data){
    for(let i=0;i<this.user.length;i++){
      if(this.user[i].username==data.username){
        this.user[i]=data;
        document.getElementById('closeEdit').click();
      }
    }
    console.log(this.user)
  }
}


