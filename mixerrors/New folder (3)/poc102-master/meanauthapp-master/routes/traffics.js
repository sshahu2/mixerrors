var express = require('express');
var router = express.Router();
const Traffic = require('../models/traffic');
var nodemailer = require('nodemailer');
var email 	= require("emailjs/email");
const Nexmo = require('nexmo');
const socketio=require('socket.io');
var stripe = require('stripe')('sk_test_trZPKS9xYEDuFsF0SYjq5mDJ');
var Pusher = require('pusher');
var pusher = new Pusher({
  appId: '520744',
  key: '257d56a5303c4a79c268',
  secret: 'df0bb117806eb8a78da5',
  cluster: 'ap2',
  encrypted: true
});

router.get('/getdb', function(req, res,next) {
  //BookApi.getAllBooks(function(err, items)
  // {
  //  res.render('book/index', {title: 'Books', books: items})
  //  res.json(items);
	// });
  Traffic.find(function(err, items,next) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                else
                {
               // console.log(items);
                res.json(items);
                }

                
                });
  
});

/*router.get('/create', function(req, res) {
	//res.render('book/create');
  res.json();
});*/

router.post('/postdata', function(req, res,next) {
  let traffic = new Traffic({});
  traffic.Sl_No=req.body.Sl_No;
  traffic.Highway_No=req.body.Highway_No;
  traffic.City=req.body.Toll_No;
  traffic.Camera_Id=req.body.Type_of_Vechile;
  traffic.Toll_Tax=req.body.Toll_Tax;
  traffic.Time_Stamp=req.body.Time_Stamp;
  traffic.Hour=req.body.Hour;
  traffic.Lat=req.body.Lat;
  traffic.Long=req.body.Long;
traffic.save(function(err, traffic) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                   {res.send(err);
                    res.json("failed to add");}
                else
                {
               
                res.json(traffic);
                }

                /*db.close(function(){
        console.log("close");
    });*/
                });
  
});
router.post('/sendmail', function(req, res,next){
  /*var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'barman.starlord@gmail.com',
    pass: 'lenovoz570'
  }
});

var mailOptions = {
  from: 'barman.starlord@gmail.com',
  to: 'barman.rajat7@gmail.com',
  subject: 'Sending Email using Node.js',
  text:"Hiiii this is Rajat from nodeJS",
  attachment: 
   [
      {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
      {path:"C:\Users\ra389015\Desktop/bootstrap101.txt", type:"application/txt", name:"boot.txt"}
   ]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/
console.log("resl"+req.body.resl);
console.log("opt"+req.body.opt);

var server 	= email.server.connect({
   user:	"barman.starlord", 
   password:"lenovoz570", 
   host:	"smtp.gmail.com", 
   ssl:		true
});

var message	= {
   text:	req.body.opt, 
   from:	"barman.starlord@gmail.com", 
   to:		"barman.rajat7@gmail.com",
   cc:		"",
   subject:	"testing emailjs",
   attachment: 
   [
      {data:`<html>this <i>${req.body.resl}</i> graph works!</html>`, alternative:true},
      {path:`C:/Users/ra389015/Desktop/${req.body.opt}.txt`, type:"application/txt", name:"boot.txt"}
   ]
};

// send the message and get a callback with an error or details of the message that was sent
server.send(message, function(err, message) { console.log(err || message); });
});
router.post('/sendsms', function(req, res,next){
  const nexmo = new Nexmo({
    apiKey:'3afac0db',
    apiSecret:'ZjPeVYV945IL95Gj'
  });
  const from = 'NEXMO';
const to = '917892712293';
const text = 'A text message sent using the Nexmo SMS API';

nexmo.message.sendSms(from, to, text, (error, response) => {
  if(error) {
    throw error;
  } else if(response.messages[0].status != '0') {
    console.error(response);
    throw 'Nexmo returned back a non-zero status';
  } else {
    console.log(response);
  }
});

});
router.post('/charge', function(req,res){
      const amount=2000;
      console.log(" email "+req.body.stripeEmail+" token "+req.body.stripeToken)
      /*stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
      })
      .then(customer=>stripe.charges.create({
        amount,
        description:'Web Development Ebook',
        currency:'usd',
        customer:customer.id
      }))
      .then(charge=>console.log("Success"))
      .catch(err=>console.log(err));*/
})
router.post('/vote', function(req,res){
     pusher.trigger('my-poll', 'my-event', {
  points:1,
  os:req.body.os
});  
return res.json({
  success:true,
  message:'Thanks for voting'
});
})

router.post('/success',function(req,res){
     
   /*  res.json({
  success:true,
  message:'Thanks for Paying'
});
setTimeout(function () {
     res.redirect('http://localhost:4200/landing');
    }, 1000);*/
    res.redirect('http://localhost:4200/landing');
});
router.post('/error',function(req,res){
    /* res.json({
  success:"error",
  message:'Try again after sometime'
});*/
res.redirect('http://localhost:4200/payment');
});
router.post('/cancel',function(req,res){
    /*  res.json({
  success:"cancel",
  message:'payment cancelled'
});*/

res.redirect('http://localhost:4200/payment');
});

module.exports = router;