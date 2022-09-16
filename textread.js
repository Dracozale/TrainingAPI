var express = require('express');
const fetch = require('node-fetch');
//const mssql = require('mssql');
var request = require('request');

// const{
//     setIntervalAsync,
//     clearIntervalAsync} = require('set-interval-async/dynamic');
// const {reset,restart} = require('nodemon');
// const { response } = require('express');

async function main(){
    try{
        
var options = {
    'method': 'GET',
    'url': 'https://posmalaysia.myfreshworks.com/crm/sales/api/analytic_reports/schedule/?id=e896e948-6d22-4f03-bcc4-17f545380196',
    'headers': {
        'Authorization': 'Token token=0CAejVzbO1-lQUs_IgBIWw'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);

    // Raw data
    const raw = response.body;


    // Split data by lines
    const data = raw.split('\n');
    

    // Extract array of headers and
    // cut it from data
    const headers = (data.shift()).split(',');
    console.log("header:",headers);
    // Define target JSON array
    let json = [];

    // Loop data
        for(let i = 0; i < data.length; i++) {
        // Remove empty lines
        if(/^\s*$/.test(data[i])) continue;
        // Split data line on cells
        const contentCells = data[i].split(',');
        // Loop cells
        let jsonLine = {};
        for(let i = 0; i < contentCells.length; i++) 
        jsonLine[headers[i]] = contentCells[i];
        // Push new line to json array
        json.push(jsonLine);
        }

        // Result
        console.log(data);
       // console.log(json);
            
        });
        
    }catch (error){
        console.log("error!!!!!",Error)
    }
}
main();


//const { MSSQLError } = require('mssql');

//const sqlConfig = {
    //user: 'sa',
    //password: 'gksb123$',
    //database: 'WoocommerceStaging',
    //server: '10.1.16.92',
    //pool: {
      //max: 10,
      //min: 0,
    //},
    //options: {
      //encrypt: false, // for azure
      //trustServerCertificate: true // change to true for local dev / self-signed certs
    //}
  //}

//const training_pool = new mssql.ConnectionPool(sqlConfig);
//const trainignConnect = training_pool.connect();
