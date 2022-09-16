var express = require('express');
const fetch = require('node-fetch');
const mssql = require('mssql');

const{
    setIntervalAsync,
    clearIntervalAsync} = require('set-interval-async/dynamic');
const { reset,restart} = require('nodemon');


const sqlConfig = {
  user: 'sa',
  password: 'gksb123$',
  database: 'WoocommerceStaging',
  server: '10.1.16.92',
  pool: {
    max: 10,
    min: 0,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const training_pool = new mssql.ConnectionPool(sqlConfig);
const trainingConnect = training_pool.connect();

async function main(){
    const timer = setIntervalAsync(
        (async function(){
            //nak letak api function kat sini
            console.log("location to put api call!!!!");
            try{
              let val_acc = "https://apis.pos.com.my/apigateway/newcore/api/validatecustomeraccount/v1?accountNo=8800472220"
              headerList = {
                "X-User-Key": "dU1aMnpuZXJFU0tTYmNValhZWkM4c2xHY2JxZGlFR2M=",
              }
              var val_result = "";
              val_result = await fetch(val_acc,{
                method:"GET",
                headers: headerList,
              })

              let data = await val_result.text();
              let jsonData = JSON.parse(data);
              var account = jsonData.resData.account;
              //console.log("value account no:",account.accountNo);
              //console.log("value customer name:",account.customerName);
              var accno = account.accountNo;
              var custname = account.customerName;

              await trainingConnect;

              var query = "INSERT INTO [dbo].[woocommercheckacc] ([accno],[customername]) VALUES ('"+ accno + "','"+ custname +"')";
              const queryesult = await training_pool.query(query);
              console.log("query result",queryesult);

            }catch (error){
              console.log("Error pggl API:",error);
            } 
            ///end function call api
    })
    ,5000)
}
main();

// let headersList = {
//   "X-User-Key": "dU1aMnpuZXJFU0tTYmNValhZWkM4c2xHY2JxZGlFR2M="
//   }
//   fetch("https://apis.pos.com.my/apigateway/newcore/api/validatecustomeraccount/v1?accountNo=8800472220", { 
//     method: "GET",
//     headers: headersList
//   }).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(response.accountNo);
//   })