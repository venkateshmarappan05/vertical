const connection = require('../config/db.js');
const express =require('express');
var db = require("db"); 
var dateFormat = require('dateformat');
const shortid = require('shortid');
const Employee = 'tblemployees';
const Attendance='attendance';
const Leaves='tblleaves'
module.exports = {

leaveForm: async(req, res) => {

let data=req.body;
const date1 = new Date(data.startDate);
const date2 = new Date(data.endDate);
const diffTime = Math.abs(date2 - date1);
const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(typeof date1);

let pval = {
   EmpId:data.EmpId,
   startDate:data.startDate,
   endDate:data.endDate,
   leaveType:data.leaveType,
   halfDay: data.halfDay,
   reason:data.reason,
   totalDays:totalDays,
   Status:data.Status,
   CreatedOn:dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")
 }
 connection.query("INSERT INTO " + Leaves + " SET ?", pval , function(err,result){
    if(err){
     res.status(500).json({ errors: err});
    }
    else{
        res.status(200).json({ message: 'Stored Successfully'})
    }
 });
},

leaveShow: async(req,res) => {
  let data=req.body;

  let EmpId= data.EmpId;
  connection.query("SELECT * FROM `tblleaves` WHERE  EmpId = '" + EmpId + "' " ,function(err,result){       
    if (err) {
      res.status(500).json({ errors: err });
    }
    else {
      if (result.length == 0) {
        res.status(200).json({ status: "ok", message: "No datas found" });
      }
      else {
        res.status(200).json({ status: "ok", message: result });
      }
    }
  });
}
};