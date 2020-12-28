function sayHellow(name) {
  console.log('Hello ' + name);
}

//sayHellow('Zack');
//console.log(global);

//console.log(module);

// use const instead of var to not accidently ovverride the logger variable
//const logger = require('./logger');
//const log = require('./logger');
//console.log(log);

//log('zack');

const path = require('path');

var pathObj = path.parse(__filename);

//console.log(pathObj);

const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('totalMemory : ' + totalMemory);
// template strings
console.log(`freeMemory : ${freeMemory}`);


const fs = require('fs');

const files = fs.readdirSync('./');

//console.log(files);

fs.readdir('./', function (err, files) {
  if (err) {
    console.log('Error : ' + err);
  }
  else {
    console.log('Result : ', files);
  }

});

const EventEmmiter = require('events');
const emmiter = new EventEmmiter();

emmiter.on('messageLogged', function () {
  console.log('Listner called');
});

//Raise an event
emmiter.emit('messageLogged');
emmiter.emit('messageLogged');




// emmiter.on('messageLogged 2', function (arg) { //e , eventArg
//   console.log('Listner called 2', arg);
// });

// //Raise an event
// emmiter.emit('messageLogged 2', { id: 1, url: 'http://' });


// //Arrow function
// emmiter.on('messageLogged 3', (arg) => { //e , eventArg
//   console.log('Listner called 3', arg);
// });





//Raise an event
//emmiter.emit('messageLogged 3', { id: 2, url: 'http://2' });

//Raise : logging (data : message)

const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged 3', (arg) => { //e , eventArg
  console.log('Listner called 3', arg);
});


//Raise an event
logger.log('message');


const http = require('http');

// this server is an eventEmmiter
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hellow Zack');
    res.end();
  }
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }

});

// server.on('connection', (socket) => {
//   console.log('New Connection ...');
// });

server.listen(3000);
console.log('Listning on port 3000...');


