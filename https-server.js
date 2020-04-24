var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync('keys/key.pem', 'utf8');
var certificate = fs.readFileSync('keys/cert.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };
var express = require('express');
var app = express();

// your express configuration here

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443, function(e){
    console.log( getIPAddressList() )
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get('/index3', function (req, res) {
    res.sendFile(__dirname + "/index3.html");
});
app.get('/three.min.js', function (req, res) {
    res.sendFile(__dirname + "/three.min.js");
});
app.get('/manifest.json', function (req, res) {
    res.sendFile(__dirname + "/manifest.json");
});
app.get('/DeviceOrientationControls.js', function (req, res) {
    res.sendFile(__dirname + "/DeviceOrientationControls.js");
});


function getIPAddressList(){
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var addresses = []


    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
    
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
    
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                addresses.push(ifname + ':' + alias + " / " + iface.address);
            } else {
                // this interface has only one ipv4 adress
                addresses.push(iface.address);
            }
            ++alias;
        });
    });

    return addresses
}   
