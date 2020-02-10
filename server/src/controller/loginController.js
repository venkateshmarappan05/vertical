const connection = require('../config/db.js');
const express =require('express');
var db = require("db"); 
var dateFormat = require('dateformat');
const shortid = require('shortid');
const Employee = 'tblemployees';
const Attendance='attendance';

module.exports = {

empAdd: async(req, res) => {
let data=req.body;
let pval = {
  AdminId:data.AdminId,
   firstName:data.firstName,
   lastName:data.lastName,
    EmpId: "EMP"+shortid.generate('0123456789'),
   EmailId: data.EmailId,
   Password:data.Password,
   Gender:data.Gender,
   Dob:data.Dob,
   Department:data.Department,
   Address:data.Address,
   City:data.City,
   scheduleid:data.scheduleid,
   Phonenumber:data.Phonenumber,
   Status:data.Status,
   RegDate:dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
 }

 
 connection.query("SELECT EmpId FROM `tblemployees` WHERE EmailId = '" + data.EmailId + "' AND Password = '" + data.Password + "' ", function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
if(result.length!=0) {

        res.status(200).json({status:"fail", message: "Email Id already exist",EmpId:result[0].EmpId});
} else{
       connection.query("INSERT INTO " + Employee + " SET ?", pval , function(err,result){
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


login: async(req, res) => {
let data=req.body;

  let EmailId= data.EmailId;
  let Password=data.Password;
 
 connection.query("SELECT EmpId FROM `tblemployees` WHERE EmailId = '" + EmailId + "' AND Password = '" + Password + "' ", function(err,result){
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


clock_in: (req, res) => {
let data=req.body;

  let EmpId= data.EmpId;
  let pval = {
              EmpId:EmpId,
              date:dateFormat(new Date(), "yyyy-mm-dd"),
              time_in:dateFormat(new Date(), "mm-dd-yyyy HH:MM:ss"),
              clock_in_IP:data.clock_in_IP
              }
              console.log(dateFormat(new Date(), "mm-dd-yyyy HH:MM:ss"));
 var date1=dateFormat(new Date(), "yyyy-mm-dd");
connection.query("SELECT * FROM `attendance` WHERE date = '" + date1 + "' AND EmpId = '" + EmpId + "' " ,function(err,result){       
              if(err){
                res.status(500).json({ errors: err});
              }
              else{
                  if(result.length==0) {
                      connection.query("INSERT INTO " + Attendance + " SET ? ", pval , function(err,resa){
                     if(err){
                      res.status(500).json({ errors: err});
                     }
                     else{
                      console.log("tre");
                      res.status(200).json({status:"ok",message:"Clocked in time:"+dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")})
                     }
                      })
                  }
                  else{
                    res.status(200).json({status:"ok",message:"Clocked in time:"+result[0].date+" " +result[0].time_in})
                  }
              }                       
            });
},


clock_out: async(req, res) => {
let data=req.body;
                      
 var date1=dateFormat(new Date(), "yyyy-mm-dd");

  let EmpId= data.EmpId;
connection.query("SELECT * FROM `attendance` WHERE date = '" + date1 + "' AND EmpId = '" + EmpId + "' " ,function(err,result){ 
   if(err){
                res.status(500).json({ errors: err});
              }
              else{
const datew1 = new Date(result[0].time_in);
const date2 = new Date();
const diffTime = Math.abs(date2 - datew1);
const totalDays = Math.floor((diffTime / 1000 )/ 60 ); 

             
  connection.query('UPDATE attendance SET ? WHERE ?', [{ time_out: dateFormat(new Date(), "mm-dd-yyyy HH:MM:ss") ,status:1,   clock_out_IP:data.clock_out_IP,num_hr:totalDays }, { EmpId: EmpId},{date:date1 }], function (err, result) {
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
res.send({status:"ok",msg:"Updated Successfully"})
}
        
 });
}
  });

},

monthly_attendence: async(req, res) => {
let data=req.body;
                      
 var date1=dateFormat(new Date(), "yyyy-mm");

  let EmpId= data.EmpId;
connection.query("SELECT * FROM `attendance` WHERE EmpId = '" + EmpId + "' " ,function(err,result){ 
   if(err){
                res.status(500).json({ errors: err});
              }
              else{
                res.status(200).json({status:"ok",result:result});
}
  });

},
};