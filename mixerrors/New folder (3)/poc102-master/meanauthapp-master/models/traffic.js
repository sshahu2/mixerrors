const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const myCollSchema = mongoose.Schema({
  Sl_No:Number,
  Highway_No:String,
  City:String,
  Toll_No:String,
  Camera_Id:String,
  Type_of_Vechile:String,
  Toll_Tax:Number,
  Time_Stamp:String,
  Hour:Number,
  Lat:Number,
  Long:Number
});

const Traffic = module.exports = mongoose.model('traffic', myCollSchema,'traffic');
