"use strict";

const Server = require('./Server');

class RestServer extends Server {
    constructor(router) {
        super();
        let self = this;
        
        router.get('/users', (req, res) => {
            self.getUsers((err, data) => {
                data.forEach(user => {
                    user.links = {
                        rel: 'self',
                        href: req.originalUrl + '/' + user._id,
                    };
                });
                res.status(200).jsonp(data);
            });
        });  
        
        router.post('/users', (req, res) => {
            let name = req.body.name;
            let score = req.body.score;
            
            self.createUser(
                { name: name, score: score },
                (err, data) => {
                    data.links = {
                        rel: 'self',
                        href: req.originalUrl + '/' + data._id,
                    };
                    res.status(200).jsonp(data);
                }
            );
        });
        
        
        router.get('/users/:user_id', (req, res) => {
            let user_id = req.params.user_id;
            
            self.readUser(user_id,
                (err, data) => {
                    data.links = {
                        rel: 'self',
                        href: req.originalUrl,
                    };
                    res.status(200).jsonp(data);
                }
            );
        });
        
        router.put('/users/:user_id', (req, res) => {
            let user_id = req.params.user_id;
            let name = req.body.name;
            let score = req.body.name;
            
            self.updateUser(user_id,
                { name: name, score: score },
                (err, data) => {
                    data.links = {
                        rel: 'self',
                        href: req.originalUrl,
                    };
                    res.status(200).jsonp(data);
                }
            );
        });
        
        router.delete('/users/:user_id', (req, res) => {
            let user_id = req.params.user_id;
            
            self.deleteUser(user_id,
                { name: name, score: score },
                (err, data) => {
                    res.sendStatus(200);
                }
            );
        });
    }
}

module.exports = RestServer;
