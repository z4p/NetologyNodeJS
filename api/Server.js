const Datastore = require('nedb')


class Server extends Datastore {
    constructor() {
        super();
        this.insert([
            {name: 'John', score: 13},
            {name: 'Snow', score: 7},
            {name: 'Andy', score: 1},
            {name: 'Bob', score: 56},
            {name: 'Marley', score: 3},
        ]);
    }

    getUsers(callback, find_fields = {}) {
        this.find(find_fields, callback);
    }
    
    createUser(userObject, callback = Function) {
        this.insert(userObj, callback); 
    }
    
    readUser(user_id, callback = Function) {
        this.find({ _id: user_id}, callback);
    }
    
    updateUser(user_id, userObject, callback = Function) {
        this.update({ _id: user_id}, userObject, {}, callback);
    }
    
    deleteUser(user_id, callback = Function) {
        this.remove({ _id: user_id}, {}, callback);
    }
}


module.exports = Server;
