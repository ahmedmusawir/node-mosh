const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost:27017/mongo-exercises',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to Mongo Docker'))
  .catch(err => console.error('No Connection ... you are fucked', err));

mongoose.set('debug', true);

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

//POST DATA INTO MONGO
async function createCourse() {
  const course = new Course({
    name: 'Shit Course',
    author: 'Moose',
    tags: ['moose', 'pissed', 'off'],
    isPublished: false,
    price: 400
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

// GET DATA FROM MONGO
// async function getCourses() {
//   // const courses = await Course.find();
//   const pageNumber = 1;
//   const pageSize = 1;
//   // /api/courses?pageNumber=2&pageSize=10

//   const courses = await Course.find({ author: 'Mosh', isPublished: true })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(10)
//     .sort({ name: 1 }) //-1 for desending
//     .select({ name: 1, tags: 1 }); //asking for name and tags field only
//   console.log(courses);
// }

// async function getCourses() {
//   return await Course.find({ isPublished: true, tags: 'backend' })
//     .sort({ name: -1 })
//     .select({ name: 1, author: 1 });
// }

// async function getCourses() {
//   return await Course.find({
//     isPublished: true,
//     tags: { $in: ['frontend', 'backend'] }
//   })
//     .sort('-price')
//     .select('name author price');
// }
// async function getCourses() {
//   return await Course.find({
//     isPublished: true
//   })
//     .sort('-price')
//     .select('name author price')
//     .or([{ tags: 'frontend' }, { tags: 'backend' }]);
// }
// async function getCourses() {
//   return await Course.find({
//     isPublished: true
//   })
//     .sort('-price')
//     .select('name author price')
//     .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
// }
// async function run() {
//   const courses = await getCourses();
//   console.log(courses);
// }

// run();

//UPDATE COURSES
async function updateCourse(id) {
  // var query = { _id: mongoose.Types.ObjectId(id) }; //NO LUCK with json uploaded data
  // const course = await Course.find(query); //NO LUCK with json uploaded data
  // const course = await Course.findById(mongoose.Types.ObjectId(_id)); //NO LUCK with json uploaded data

  const course = await Course.findById(id);
  console.log(`Course: ${course}`);
  if (!course) return;

  // course.isPublished = true;
  // course.author = 'Another updated Author';

  course.set({
    isPublished: true,
    author: 'Spider Man'
  });

  const result = await course.save();
  console.log(result);
}

// updateCourse('5b9b3ae8de2ac011e12c4fa3');

//ANOTHER WAY TO UPDATE DATA WITHOUT FIND BY ID
async function updateCourseDirectly(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: 'Mooshy Mongo',
        isPublished: true
      }
    }
  );
  console.log(result);
}

// updateCourseDirectly('5a68fdd7bee8ea64649c2777'); //json data upload doesn't work
// updateCourseDirectly('5b9b3ae8de2ac011e12c4fa3'); //works cuz this was created by mongoose

//ANOTHER WAY TO UPDATE DATA WITHOUT FIND BY ID
async function updateCourseDirectlyAnother(id) {
  const course = await Course.findOneAndUpdate(
    // { _id: mongoose.Types.ObjectId(id) }, //NO LUCK
    { _id: id },
    // { author: 'Mosh' },
    {
      $set: {
        author: 'Butt Fucker 2',
        isPublished: false,
        price: 100
      }
    },
    { new: true }
  );
  console.log(course);
}

// updateCourseDirectlyAnother('5a68fdf95db93f6477053ddd'); //json array file uploaded data NO LUCK
// updateCourseDirectlyAnother('5a68fdf95db93f6477053ddd'); //json array file uploaded data NO LUCK
// updateCourseDirectlyAnother('5b9b3ae8de2ac011e12c4fa3'); //works cuz this was created by mongoose

//DELETE COURSE FROM DB
async function removeCourse(id) {
  // const course = await Course.deleteOne({ author: name });
  // const course = await Course.deleteOne({ _id: id });
  // const course = await Course.deleteMany({ tags: tags });
  const course = await Course.findByIdAndRemove({ _id: id });
  console.log(course);
}

// removeCourse('Mosh'); //json array file uploaded data NO LUCK
// removeCourse(['node', 'backend']); //works cuz this was created by mongoose
// removeCourse('5a68fdf95db93f6477053ddd'); //json array file uploaded data NO LUCK
// removeCourse('5b9b4fcf36557b1a7086ea04'); //data gone!
