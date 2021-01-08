const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date, default: Date.now
  },
  isPublished: Boolean,
  price: Number
});

//Class
const Course = mongoose.model('Course', courseSchema);


// Select Courses Exercice 1
async function getCourses1() {
  return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function getCourses2() {
  return await Course
    .find({ isPublished: true/*, tags: { $in: ['frontend', 'backend']*/ })
    .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .sort('-price')
    .select('name author price');
}

async function getCourses3() {
  return await Course
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort('-price')
    .select('name author price');
}


async function run() {
  //const courses = await getCourses1();
  //const courses = await getCourses2();
  const courses = await getCourses3();

  console.log(courses);
}

//run();

// Updating a course

async function updateCourse(id) {
  // Approach : Query First
  // findById()
  // Modify its properties
  // save()

  // const course = await Course.findById(id);
  // if (!course) return;
  // course.isPublished = true;
  // course.author = 'Ivan Zaytsev';
  // //course.set({ isPublished: true, author: 'Ivan Zaytsev' });
  // const result = await course.save();
  // console.log(result);

  // Approach : Update first
  // Update Directly
  // Optionally : get the document

  const result = await Course.findOneAndUpdate({ isPublished: false }, {
    $set: {
      author: 'Ivan Zaytsev',
      isPublished: false
    }
  });
  console.log(result);


}

updateCourse('5a68fdc3615eda645bc6bdec');

