//const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');
const debug = require('debug')('app:startup');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const genres = require('./routes/genres');
const express = require('express');
const app = express();
// app.post();
// app.put();
// app.delete();

app.set('view engine', 'pug');
app.set('views', './views'); //default


console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`app : ${app.get('env')}`);

app.use(express.json());

// if you have html form with input fields and post that form to the server 
// the body of your request wii look like 
// key=value & key = value
//{ extended: true } => with this we can pass arrays and complexes objects
app.use(express.urlencoded({ extended: true }));

// we gonna put out css images in his folder
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/', home);


//Configuration
console.log('Application name :' + config.get('name'));
console.log('Mail server name:' + config.get('mail.host'));
console.log('Mail Password :' + config.get('mail.password'));


if (app.get('env') === 'development') {
  app.use(morgan('dev'));
  //console.log('Morgan enabled...');
  //startupDebugger('Morgan enabled...');
  debug('Morgan enabled...');
}

//db work
//dbDebugger('Connected to the dataBase...');


// app.use(function (req, res, next) {
//   console.log('Logging...');
//   next();
// });
app.use(logger);



app.use(function (req, res, next) {
  console.log('Authenticating...');
  next();
});



app.get('/api/posts/:year/:month', (req, res) => {
  //res.send(req.params);
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
