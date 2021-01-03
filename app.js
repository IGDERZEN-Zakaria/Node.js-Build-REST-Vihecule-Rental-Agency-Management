const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// app.post();
// app.put();
// app.delete();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];


app.get('/', (req, res) => {
  res.send('Hellow World');
});

app.get('/api/courses', (req, res) => {
  //res.send([1, 2, 3]);
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  // const schema = {
  //   name: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema);
  // console.log(result);

  // if (!req.body.name || req.body.name.length < 3) {
  //   //400 Bad Request
  //   //res.status(400).send('Name is Required and should be minimum 3 caracters.');
  //   //res.status(400).send(result.error);
  //   res.status(400).send(result.error.details[0].message);

  //   return;
  // }

  const { error } = validateCourse(req.body); // resuslt.error

  if (error) // resuslt.error
    return res.status(400).send(error.details[0].message);



  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  //Look up the courses
  // If not existing , return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the Given ID was not found.');

  //Validate 
  // If invalide , reurn 400 - Bad Request
  //const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // result.error
  if (error) // result.error
    return res.status(400).send(error.details[0].message);


  //Update the course
  course.name = req.body.name;
  // Return  the updated course
  res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  //Look up the courses
  // If not existing , return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the Given ID was not found.');

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //Return the same course
  res.send(course);

});


// app.get('/api/courses/:id', (req, res) => {
//   res.send(req.params.id);
// });

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send('The course with the Given ID was not found.');
  res.send(course);
});



function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}


app.get('/api/posts/:year/:month', (req, res) => {
  //res.send(req.params);
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
