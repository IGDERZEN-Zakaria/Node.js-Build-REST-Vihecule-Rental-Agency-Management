const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
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
});

//Class
const Course = mongoose.model('Course', courseSchema);

//createCourse();
async function createCourse() {
  // Object 
  const course = new Course({
    name: 'Angular Course',
    author: 'Zack',
    tags: ['Angular', 'Frontend'],
    isPublished: true,
  });

  const result = await course.save();

  console.log(result);
}

// Paginaion

const pageNumber = 2;
const pageSize = 10;
//    /api/Courses?pageNumber=2&pageSize=10

// Select Courses
async function getCourses() {
  const courses = await Course
    //.find({ author: 'Zack', isPublished: true })
    //.find({ price: { $gte: 10, $lte: 20 } }) // gt => greater than or equal 
    //.find({ price: { $in: [10, 15, 20] } })
    //Logical Operators
    //.or([{ author: 'Zack' }, { isPublished: true }])
    //.and([{}, {}])
    // Regular Expressions 

    // Starts with Zack
    //.find({ author: /^Zack/ })

    //Ends with Igd
    //.find({ author: /Igd$/ })

    //Contains ck
    // i  is for case insensitive
    .find({ author: /.*ck.*/i })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);

}

getCourses();
