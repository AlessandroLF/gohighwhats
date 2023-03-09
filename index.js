const path = require("path");
const fs = require("fs");
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = (res) => {
    fs.readFile(path.join(__dirname, "start.html"), (err, content) =>{
        res.write(content);
        res.write("<title>TestBed</title></head><body><h1>Testing</h1><div id='map'>t1</div>");
        const client = new Client();
        client.on('qr', (qr, err) => {
            // Generate and display QR code for user to scan
            qrcode.toDataURL(qr, (err, url)=>{
                res.write("<img src='" + url + "' >");
            });
          });
          
          client.on('ready', () => {
            console.log('Client is ready!');
          });

          client.initialize();

        console.log('<div>test init</div>');
        
    });
};