import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { URLService } from "../services/url.service";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import * as io from 'socket.io-client';
import "rxjs/add/operator/map";
@Component({
  selector: "app-chatbox2",
  templateUrl: "./chatbox2.component.html",
  styleUrls: ["./chatbox2.component.css"]
})
export class Chatbox2Component implements OnInit {
  message = "";
  typing = false;
  listOfMessages = [];
  didLogoutFail = false;
  listOfMessagesClicked: boolean[] = [];

  socket: SocketIOClient.Socket;
  socketId:any;
  url = "http://localhost:3000/customer";
  isOperatorMode:boolean;
  botImageUrl:string = "../../../assets/images/bot.png";
  operatorImageUrl:string = "../../../assets/images/operator.png";

  clicked = false;
  clickedMessageId = -1;
  private typewriter_text: string = "...";
  private typewriter_display: string = "";

  messageFormControl: FormControl;
  autoSuggestDisabled = true;
  //showDropDown
  showDropDown = false;
  options: String[];
  stateForm: FormGroup;

  //variables for overall feedbacks (i.e. score out of maximum five stars)
  showFeedbackView: boolean; //make it false on ngOnInit()

  showFeedbackSubmissionStatus: boolean = false;
  feedbackSubmissionStatus: string;
  submissionSucceded: boolean;
  submissionFailed: boolean;
  constructor(
    private http: Http,
    private router: Router,
    private urlService: URLService,
    private fb: FormBuilder
  ) {
    this.initForm();
    this.messageFormControl = new FormControl();
  }

  @ViewChild("scrollme") private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    if (this.typing) this.scrollUpChat();
  }

  ngOnInit() {
    this.typing = true;
    this.showFeedbackView = false; //don't show feedbacks view on view init
    this.setOperatorMode(false);
    //getting messages from localstorage
    this.listOfMessages = JSON.parse(localStorage.getItem("messages"));
    if (this.listOfMessages == null) {
      this.saveMessage("Hi! How can I help you?", "bot",'initial_greeting_angular'); //greeting when the user enters for a new session
      return;
    }
    for (let i = 0; i < this.listOfMessages.length; i++) {
      this.listOfMessagesClicked.push(false);
    }

    //console.log("already stored messages:\n"+localStorage.getItem("messages"))
    this.typingCallback(this);
    let that = this;
    //connect to socket
    this.socket = io.connect(this.url);
    this.socket.on('connect',()=>{
      //this.socketId = this.socket.id;
      console.log('socket id is :'+that.socketId);
    })
    this.socket.on('customer message',(message)=>{
      //console.log('inside socket event(customer message):');
      //console.log('customer message:'+message);
      let userType = that.getOperatorMode()? 'operator':'bot';
      //console.log('received message from:'+userType);
      // console.log('operator mode?:'+this.getOperatorMode());
      if(message.trim()=="No problem! I'll hand you over to a live operator. Just one moment...".trim()){
        userType = 'bot';
      }
      that.saveMessage(message,userType,null);
      console.log('setting typing to false.');
      that.typing = false;
      that.scrollUpChat();
      console.log('then scroll up');
      let _that = that;
      setTimeout(()=>{
        console.log('value of typing after 1s is:'+_that.typing);
      },1000);
      // this.messages.push(message);
      // console.log('current messages:'+this.messages);
    });
    this.socket.on('system error', function (error) {
      var errorText = error.type + ' - ' + error.message;
      console.log(errorText);
    });
    this.socket.on('operator requested',function(customerId){
      that.setOperatorMode(true);
      console.log('operator mode is:'+that.getOperatorMode());
    });
    // this.socket.on('operator typing',function(data){
    //   console.log('operator is typing');
    // //   that.typing = true;
    // })
  }  
  ngAfterViewInit() {
    this.scrollUpChat();
  }
  initForm(): FormGroup {
    return (this.stateForm = this.fb.group({
      message: [null]
    }));
  }
  setOperatorMode(mode:boolean){
    console.log('set operator as'+mode);
    if(mode==true){
      this.isOperatorMode = true;
    }
    else{
      this.isOperatorMode = false;
    }
  }
  getOperatorMode(){
    console.log('operator?:'+this.isOperatorMode);
    return this.isOperatorMode;
  }
  ngOnChanges() {
    //console.log(this.message);
  }
  toggleFeedbackView() {
    this.showFeedbackView = !this.showFeedbackView;
  }

  selectValue(value) {
    console.log("selected value :" + value);
    //this.stateForm.patchValue({"message": value});

    //this.message = value;
    this.closeDropDown();
  }
  closeDropDown() {
    console.log("closing dropdown");
    this.showDropDown = false;
  }

  openDropDown() {
    console.log("opening dropdown");
    this.showDropDown = true;
  }

  getSearchValue() {
    return this.stateForm.value.search;
  }

  //AUTOCOMPLETE
  handleMessageBoxKeyUp(event) {
    switch (event.keyCode) {
      case 32: // 32 is for space pressed
        var msg = this.stateForm.get("message").value;
        console.log(msg);
        if (msg == null) {
          return;
        }
        //get autocompletions to show on dropdown
        var autocompleteURL = this.urlService.getAutocompleteURL();
        this.http
          .post(autocompleteURL, {
            length: msg.split(" ").length,
            message: msg
          })
          .map(res => res.json())
          .subscribe(
            successResponse => {
              if (successResponse.success) {
                this.options = successResponse.suggestions;
                this.openDropDown();
                this.scrollUpChat();
              } else {
                console.log("Server returned false.");
              }
            },
            err => {
              console.log("Error in getting suggestions:" + err);
            }
          );
        this.openDropDown();
        break;
      case 13: //3=enter pressed
      //this.saveMessage(this.stateForm.get('message').value,'user');
      //console.log('enter pressed.');
      //this.handleNewMessage();
      //break;
      case 38: //for up arrow key
      case 40: //for down arrow key
        break;
      default:
      // console.log(event.keyCode);
      //this.closeDropDown();
    }
  }
  handleFeedback(feedback, id) {
      if (id == -1) {
        console.log("No message was selected for feedback");
        return;
      } else {
      this.showFeedbackSubmissionStatus = true;
      var previous = id - 1;
      var query;
      if (previous < 0) {
        query = null;
      } else {
        query = this.listOfMessages[previous];
      }
      var response = this.listOfMessages[id];
      var data = {
        user_query: query == null ? null : query.message,
        bot_response: response.message,
        old_intent:response.old_intent,
        feedback: feedback == 1 ? "positive" : "negative"
      };
      console.log("sending feedback: " + JSON.stringify(data));
      this.submissionSucceded = true;
      this.feedbackSubmissionStatus = "sending ...";
      this.http
        .post(this.urlService.getAddFeedbackURL(), data)
        .map(res => res.json())
        .subscribe(
          resJSON => {
            console.log('succeeded in sending.');
            if (resJSON.success) {
              //this.clickedMessageId = -1;
              this.submissionSucceded = true;
              this.feedbackSubmissionStatus ="Submitted feedback successfully.";
              console.log("Submitted feedback successfully.");
            } else {
              //this.clickedMessageId = -1;
              this.submissionFailed = true;
              this.feedbackSubmissionStatus = "Submitting feedback Unsuccessfull on server.";
              console.log("Submitting feedback Unsuccessfull!");
            }
            this.removeFeedbackStatusBox();
          },
          err => {
            console.log('failed in sending.');
            this.submissionFailed = true;
            this.feedbackSubmissionStatus = "failed: " + err;
            this.removeFeedbackStatusBox();
          }
        );
    }
  }
  removeFeedbackStatusBox() {
    setTimeout(() => {
      this.showFeedbackSubmissionStatus = false;
      this.submissionFailed = null;
      this.submissionSucceded = null;
      this.showFeedbackSubmissionStatus = false;
      this.feedbackSubmissionStatus = "";
    }, 2000);
  }

  logout() {
    this.didLogoutFail = false;
    this.http
      .get(this.urlService.getLogoutURL())
      .map(resLogout => resLogout.json())
      .subscribe(resLogoutJSON => {
        if (resLogoutJSON.success) {
          localStorage.clear();
          this.router.navigate(["/"]);
        } else {
          this.didLogoutFail = true;
          this.message = "Logout failed! ";
        }
      });
  }

  handleBotMessageClick(e) {
    let id = e.target.id;
    console.log("Clicked message:" + id);
    this.listOfMessagesClicked[id] = true;
    if (this.listOfMessages[id])
      if (this.clickedMessageId == id) this.clickedMessageId = -1;
      else this.clickedMessageId = id;
    console.log(this.listOfMessagesClicked[id]);
  }
  getCurrentDateTime() {
    let date = new Date();
    let messageDate = date.getDate();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let messageMonth = months[date.getMonth()]; //date.getUTCMonth() returns month in integer
    let currentOffset = date.getTimezoneOffset();
    let ISTOffset = 330; // IST offset UTC +5:30
    let ISTTime = new Date(
      date.getTime() + (ISTOffset + currentOffset) * 60000
    );
    // ISTTime now represents the time in IST coordinates
    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let messageHour = date.getHours();
    let messageSeconds = date.getSeconds();
    let currentDateTime =
      messageDate + " " + messageMonth + " " + hoursIST + ":" + minutesIST;
    return currentDateTime;
  }
  saveMessage(message, type, old_intent) {
    if(type==null || type=='undefined' || type=='bot'){
      console.log('operator mode inside saveMessage() '+this.getOperatorMode());
      type = this.getOperatorMode()?'operator':'bot';
      console.log('set type of message as:'+type);
    }
    console.log('saving message for '+type+' with intent '+old_intent);
    if (message === null || message == "" || typeof message == "undefined") {
      console.log("empty or undefined message in saveMessage()");
      return;
    }
    let messageTimeStamp = this.getCurrentDateTime();
    message = message.trim();
    //let userType = "user";
    let new_message = {
      message: message,
      messageDate: messageTimeStamp,
      userType: type,
      old_intent:old_intent
    };
    // if(type=="bot")
    // {
    //   new_message["old_intent"] = old_intent;
    // }
    let messages = JSON.parse(localStorage.getItem("messages"));
    //console.log("saved messages:"+localStorage.getItem("messages"));
    if (messages === null) {
      //console.log("Empty Chat!");
      var messageArray = [new_message];
      localStorage.setItem("messages", JSON.stringify(messageArray));
    } else {
      console.log("Saving message:"+JSON.stringify(new_message));
      messages.push(new_message);
      localStorage.setItem("messages", JSON.stringify(messages));
    }
    this.listOfMessages = JSON.parse(localStorage.getItem("messages"));
    this.scrollUpChat();
  }
  handleClickableBotMessage(message) {
    this.stateForm.patchValue({ message: message });
    this.handleNewMessage();
  }

  handleNewMessage() {
    console.log("inside handleNewMessage()");
    var message = this.stateForm.get("message").value;
    console.log("message is :" + message);
    try{
      this.socket.emit('customer message',message);
      this.stateForm.patchValue({ message: "" });
      //this.typing = true;
    }
    catch(e){
      console.log('Error:'+e);
      setTimeout(()=>{
        this.handleNewMessage();
      },500);
      return;
    }
    //trim extra whitespaces in starting and ending to avoid sending empty and space filled message to the bot
    if (message == null || typeof message == "undefined") {
      console.log("empty or undefined message in handleNewMessage()");
      return;
    }
    message = message.trim();
    if (message == "") {
      console.log("Empty message!");
      return;
    }
    //console.log("New message:"+message);
    this.saveMessage(message, "user",null);
    //this.getBotResponse(message);
    //message is stored in stateForm so empty it
  }
  getBotResponse(message) {
    console.log("Getting response from Bot.");
    let botMessage: String = "";
    var queryUrl =
      this.urlService.getBotResponseURL() + "?user_query=" + message;
    //console.log("query url is :" + queryUrl);
    this.http
      .get(queryUrl)
      .map(res => res.json())
      .subscribe(
        resJSON => {
          if (resJSON.success || resJSON.type == "success") {
            console.log("Got the response:" + JSON.stringify(resJSON));
            botMessage = resJSON.bot_response; // assuming server sends response to query in key result in received object
            let old_intent = resJSON.old_intent;
            this.saveMessage(botMessage, "bot",old_intent);
            this.typing = false;
            this.scrollUpChat();
          } else {
            console.log("Error at server.");
            botMessage = "ERROR AT SERVER. ";
            this.typing = false;
            this.saveMessage(botMessage, "bot",botMessage);
          }
        },
        err => {
          botMessage = "NETWORK ERROR! " + err;
          this.typing = false;
          this.saveMessage(botMessage, "bot",botMessage);
          console.log("Error:" + err);
        }
      );
  }
  scrollUpChat(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      //console.log("Inside scrollup()");
    } catch (err) {}
  }

  typingCallback(that) {
    let total_length = that.typewriter_text.length;
    let current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
    } else {
      that.typewriter_display = ".";
    }
    setTimeout(that.typingCallback, 500, that);
  }
}
