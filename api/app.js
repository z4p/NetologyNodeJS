"use strict";

const restServer = require('./rest-server');
//const rpcServer = require('./rpc-server');

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// REST server 
const rtREST = express.Router();
const server1 = new restServer(rtREST);
app.use("/rest-api/v1", rtREST);

// RPC server 
//const rtRPC = express.Router();
//const server2 = rpcServer(rtRPC);
//app.use("/rpc", rtRPC);

app.listen(PORT, () => {
    console.log('Express server started on port %d', PORT);
});



// test

setTimeout(() => {
    performRequest('/rest-api/v1/user', 'GET');
    performRequest('/rest-api/v1/user', 'POST', { name: 'Peter'+Math.floor(Math.random()*100), score: 666 });
}, 1000);


const performRequest = (route, method, data = {}) => {
    const http = require('http');
    const querystring = require('querystring');

    let post_data = querystring.stringify(data);
    
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    };
    
    let request = http.request({
        hostname: 'localhost',
        port: PORT,
        path: route,
        method: method,
        headers: headers
    });
    
    request.on('response', response => {
        let data = '';
        response.on('data' , chunk => data += chunk);
        response.on('end' , () => {
            console.log(data);
        });
    });
    
    request.write(post_data);
    request.end();
};
