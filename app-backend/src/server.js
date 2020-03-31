const express = require('express');
//const nodeMailer = require('nodeMailer');
const bodyParser = require('body-parser');
//const axios = require('axios');
//const fetch = require('node-fetch');
//const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/global', function (req, res) {
    https.get('https://covid19.mathdro.id/api/', function(resp) {
        var data ='';

        // A chunk of data has been recieved.
        resp.on('data', function(chunk){
            data += chunk;
        });

        // A whole response has been recived. Print out the result.
        resp.on('end', function(){
            data = JSON.parse(data);
            res.send(data);
            res.end();
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.end();
    });
});

/* app.get('/global', async function(req, res) {
    const covidapi = 'https://covid19.mathdro.id/api/';
    const fetch_response = await fetch(covidapi);
    const json_covidapi = await fetch_response.json();
    res.jsonp(json_covidapi);
}); */

app.get('*', function(req, res) {
    res.status(404).end();
});

app.listen(5000, function() {
    console.log('Server runnin on port 5000');
})