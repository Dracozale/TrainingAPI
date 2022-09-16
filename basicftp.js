var express = require('express');
const fetch = require('node-fetch');
var request = require('request');
var fs = require('fs');
const ftp = require("basic-ftp")

example()

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "myftpserver.com",
            user: "very",
            password: "password",
            secure: true
        })
        console.log(await client.list())
        await client.uploadFrom("README.md", "README_FTP.md")
        await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}