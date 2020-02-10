const connection = require('../config/db.js');
const express =require('express');
var db = require("db"); 
var dateFormat = require('dateformat');
const shortid = require('shortid');
const Employee = 'tblemployees';
const Attendance='attendance';
const Admin='admin';

module.exports = {

adminsignup: async(req, res) => {
let data=req.body;
let pval = {
   AdminId: "ADMIN"+shortid.generate('0123456789'),
   EmailId: data.EmailId,
   Password:data.Password,
   Status:data.Status,
   RegDate:dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
 }

 
 connection.query("SELECT AdminId FROM `admin` WHERE EmailId = '" + data.EmailId + "' AND Password = '" + data.Password + "' ", function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
if(result.length!=0) {

        res.status(200).json({status:"fail", message: "Email Id already exist",AdminId:result[0].AdminId});
} else{
       connection.query("INSERT INTO " + Admin + " SET ?", pval , function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
        res.status(200).json({status:"ok", message: 'Stored Successfully'})
    }
 });
}
    }
 });
},


adminlogin: async(req, res) => {
let data=req.body;

  let EmailId= data.EmailId;
  let Password=data.Password;
 
 connection.query("SELECT AdminId FROM `admin` WHERE EmailId = '" + EmailId + "' AND Password = '" + Password + "' ", function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
if(result.length!=0) {

        res.status(200).json({status:"Ok", message: "Login Successfully",EmpId:result[0].EmpId});
} else{
       res.status(200).json({status:"fail", message:"Email or password wrong"});
}
    }
 });
},

empMembers: async(req, res) => {
  let data=req.body;

  let EmailId= data.EmailId;
  let Password=data.Password;
 
 connection.query("SELECT * FROM `tblemployees` WHERE AdminId = '" + data.AdminId + "'  ", function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
        console.log(result);
       res.status(200).json({status:"Ok", message:result});

    }
 });
}






};