import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GraphService } from '../services/graph.service';
import { DataService } from '../services/data.service';
import { CustomizationDialogComponent } from '../customization-dialog/customization-dialog.component';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { StocksService } from '../stock-price/stocks.service';
import { MatTableDataSource } from '@angular/material';
import { Element } from '../model/element';
import { GraphDialogComponent } from '../graph-dialog/graph-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  hide = true;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      const user = {'username': this.username, 'password': this.password};
      this.dataService.login(user).subscribe(response => {
        console.log(response);
        if (response['message'] === 'Connection success') {
          sessionStorage.setItem('user', this.username);
          this.router.navigate(['home']);
        } else {
          alert('Enter valid credentials');
        }
      });
    } else {
      alert('Enter valid credentials');
    }
  }


}
