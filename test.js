const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB... ', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    //match: /patten/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    //uppercase: true
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //Do some Async work
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: 'A course should have at least one tag'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v),
  }
});

//Class
const Course = mongoose.model('Course', courseSchema);

//createCourse();
async function createCourse() {
  // Object 
  const course = new Course({
    name: 'Angular Course',
    category: 'WEB',
    author: 'Zack',
    //tags: [],
    //tags: null,
    tags: ['frontEnd'],
    isPublished: true,
    price: 15.8
  });

  try {
    //await course.validate();
    const result = await course.save();
    console.log(result);
  }
  catch (ex) {
    //console.log(ex.message);
    for (field in ex.errors)
      console.log(ex.errors[field].message);
  }
}


//createCourse();



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
    //    .find({ author: /.*ck.*/i })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .find({ _id: '5ff96daf9de2a13834c3726b' })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 })
  //.count();
  console.log(courses[0].price);

}
getCourses();
