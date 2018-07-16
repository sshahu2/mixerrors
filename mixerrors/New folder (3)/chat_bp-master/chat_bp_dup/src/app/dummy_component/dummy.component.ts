import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.css']
  })
  export class DummyComponent implements OnInit {
    isBotActive = false;
    constructor() { }
    ngOnInit() {
    }
    toggleChatBox(){
      this.isBotActive = !this.isBotActive;
    }

}