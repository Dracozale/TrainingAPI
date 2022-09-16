var express = require('express');
const fetch = require('node-fetch');
//const mssql = require('mssql');
var request = require('request');
var fs = require('fs');

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

    fs.writeFile('apiresult.txt',raw,function(err){
        if(err){
            return console.log(err)
        }
        console.log("File created!")
    });

    });
        
    }catch (error){
        console.log("error!!!!!",Error)
    }
}
main();
