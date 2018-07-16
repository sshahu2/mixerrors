import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import  {URLService} from '../services/url.service';

@Component({
    selector:'app-chatlogs',
    templateUrl:'./chat-logs.component.html',
    styleUrls:['./chat-logs.component.css']
})

export class ChatLogsComponent{
    isBotActive:boolean;
    //only show table when date has been submitted
    showTable:boolean;
    //date = {};
    dateStart:Date=null;
    dateEnd:Date=null;
    chatlogs:String[];
    logsBaseURL:string;
    logsURL:string[];
    employeeID:any[];
    constructor(private urlService:URLService,private http:Http){}
    ngOnInit(){
        this.showTable = false;
        this.isBotActive = false;
    }
    submitDates(){

        console.log("start is "+this.dateStart+" , end is "+this.dateEnd);
        var sd = new Date(this.dateStart),
        month = '' + (sd.getMonth() + 1),
        day = '' + sd.getDate(),
        year = sd.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let sdString = year+"/"+month+"/"+day;
        var ed = new Date(this.dateEnd),
        month = '' + (ed.getMonth() + 1),
        day = '' + ed.getDate(),
        year = ed.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let edString = year+"/"+month+"/"+day;
          //prepare data to send to server in order to get responses                      
        let data = {
            startDate:sdString,
            endDate:edString,
        };
        console.log("sending data:"+JSON.stringify(data));
        this.logsBaseURL = this.urlService.getChatLogsSavedURL();
        //get the chatlogs between start date and end date
        this.http.post(this.urlService.getChatlogsURL(),data).map(res=>res.json())
        .subscribe(
            (successJSON)=>{
                this.chatlogs = successJSON.result;
                console.log('Received data:\n'+this.chatlogs);
                //construct urls for every chatlog
                this.logsURL = [];
                this.employeeID = [];
                for(let i=0;i<this.chatlogs.length;i++){
                    this.logsURL.push(this.logsBaseURL+'/'+this.chatlogs[i]);
                    let empID = this.chatlogs[i].split("_")[1].split(".")[0]
                    this.employeeID.push(empID);
                }
                this.showTable = true;
            },
            (err)=>{
                console.log('Error '+err);
            }
        )
    }
    toggleChatBox(){
        this.isBotActive = !this.isBotActive;
    }
}