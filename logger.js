//(function (exports, require, module, __filename, __dirname) {

const EventEmmiter = require('events');
//const emmiter = new EventEmmiter();

var url = 'http://mylogger.io/log';
//module wrraper function 
//node always put ou code inside this function in everyfile.js

//module.exports.log = log;
//module.exports = log;
//module.exports.endPoint = url;
//module.exports.log = log;
//exports.log = log;

console.log(__filename);
console.log(__dirname);

class Logger extends EventEmmiter {
  // function inside class is called methode  ( No need for function keyword )
  log(message) {
    //Send Http Request
    console.log(message);

    //Raise an event
    this.emit('messageLogged 3', { id: 2, url: 'http://2' });
  }

}

module.exports = Logger;

//})