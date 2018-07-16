import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NewpopupComponent} from "../newpopup/newpopup.component";
import { VERSION, MatDialog, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.css']
})
export class MenuTabComponent implements OnInit {
  newpopDialogRef: MatDialogRef<NewpopupComponent>;
  constructor( private router: Router,private dialog: MatDialog,private graphdialog: MatDialog,private newpopdialog:MatDialog) { }
   
  openFormDialog(type) {//popup
    this.newpopDialogRef = this.dialog.open( NewpopupComponent, {
      height:"auto",
      width: "auto",
      data: {
        value: type ? type : ""
      }
    });
  }
    ngOnInit() {
  }

}
