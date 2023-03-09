const https = require("https");
const path = require("path");
const fs = require("fs");
const TOKENF = "110010197565633.2-CMfFMD4V20qgG0ITHhUxZssFh2ae0xnZHGurD0Id";
const TOKEN = "101800225595154.ccZtXqrc68FxVESWfrvLJZR0DAoiFCG";
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = (res) => {
    fs.readFile(path.join(__dirname, "start.html"), (err, content) =>{
        res.write(content);
        res.write("<title>TestBed</title></head><body><h1>Testing</h1><div id='map'>t1</div>");
        const client = new Client();
        res.write('<div>test</div>');
        client.on('qr', (qr) => {
            // Generate and display QR code for user to scan
            res.write('<div>test1</div>');
            qrcode.toDataURL(qr.toString(), (err, url)=>{
                res.write("<img src='" + url + "' >");
            });
          });
          
          client.on('ready', () => {
            console.log('Client is ready!');
          });

          client.initialize();
        /*
        const options = {
            hostname: 'web.whatsapp.com',
            method: 'GET'
            
        };
        console.log('pre');
        const req = https.request(options, response => {
            console.log(`statusCode: ${JSON(response)}`);
            response.on('data', (chunk) =>{
                console.log(chunk.toString());
                res.write(chunk.toString());
            });
            response.on('end', () =>{
                res.end();
            });
        });
        req.on('error', e => {
            console.log("error: " + e);
        });
        req.end();
        */
        
    });
};