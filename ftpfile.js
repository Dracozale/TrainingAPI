var express = require('express');
const fetch = require('node-fetch');
var request = require('request');
var fs = require('fs');
var EasyFtp = require ("easy-ftp");
const ftp = require("basic-ftp")

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

    fs.writeFile('apiresult.txt',raw,async function(err){
        if(err){
            return console.log(err)
        }
        console.log("File created!")
    });

    var file =  "./apiresult.txt";

    sendftp(file)

    });

    }catch (error){
        console.log("error!!!!!",error)
    }
}
main();

async function sendftp(data) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftp.pos.com.my",
            user: "Freshdesk",
            password: "p@ssword13",
            secure: false
        })
        console.log(await client.list())
        await client.uploadFrom(data, "apiresult.txt")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
