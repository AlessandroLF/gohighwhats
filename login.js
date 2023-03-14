const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

module.exports = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { "Content-Type": "application/json" });
    const arr = [];
    const client = new Client();
    client.on('qr', (qr, err) => {
        if(err){
            client.initialize();
        }
        else{
            qrcode.toDataURL(qr, (err, url)=>{
                arr.push({'image':url});
                res.write(JSON.stringify(arr));
            });
        }
    });
        
    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();
};