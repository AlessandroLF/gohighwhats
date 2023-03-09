const path = require("path");
const fs = require("fs");
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = (res) => {
    fs.readFile(path.join(__dirname, "start.html"), (err, content) =>{
        res.write(content);
        res.write("<title>TestBed</title></head><body><h1>Testing</h1><div id='map'>t1</div>");
        res.write('<div>test0</div>');
        const client = new Client();
        res.write('<div>test</div>');
        client.on('qr', (qr) => {
            // Generate and display QR code for user to scan
            res.write('<div>testmas'+ qr.toString() +'</div>');
            qrcode.toDataURL(qr, (err, url)=>{
                res.write("<img src='" + url + "' >");
            });
          });
          
          client.on('ready', () => {
            console.log('Client is ready!');
          });

          client.initialize();
        
    });
};