"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello Express.js');
});

app.get('/hello', (req, res) => {
    res.send('Hello stranger!');
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}!`);
});

app.all('/sub/*', (req, res) => {
    res.send(`You requested URI: ${req.originalUrl}`);
});

let middleware = (req, res, next) => {
    if (req.header('Key')) {
        next();
    } else {
        res.sendStatus(401);
    }
};

app.post('/post', middleware, (req, res) => {
    if (Object.keys(req.body).length > 0) {
        res.jsonp(req.body);
    } else {
        res.sendStatus(404);
    }
});


app.listen(PORT, () => {
    console.log('Express server started on port %d', PORT);
});



// test
setTimeout(() => {
    performPostRequest({data: 'Some data'});
    performPostRequest({data: 'Some data (with Key header)'}, 'key_value');
}, 1000);


let performPostRequest = (data, key = '') => {
    const http = require('http');
    const querystring = require('querystring');

    let post_data = querystring.stringify(data);
    
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    };
    if (key !== '') {
        headers.Key = key;
    }
    
    let request = http.request({
        hostname: 'localhost',
        port: PORT,
        path: '/post',
        method: 'POST',
        headers: headers
    });
    
    request.on('response', response => {
        let data = '';
        response.on('data' , chunk => data += chunk);
        response.on('end' , () => console.log(data));
    });
    
    request.write(post_data);
    request.end();
};
