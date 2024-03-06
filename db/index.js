const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://dharadarsh0:Ad23adarsh@cluster0.hilwbtv.mongodb.net/')
.then(()=> {
    console.log("connected to mongodb")
})
.catch((err) => {
  console.log("error connecting to mongodb")
})

// Define schemas
const AdminSchema = new mongoose.Schema({
  email : String,
  password : String,
  
});

const UserSchema = new mongoose.Schema({
  email : String,
  password : String,
});

const CourseSchema = new mongoose.Schema({
  courseName : String,
  coursePrice : Number ,
  Purchased : {
    type : Boolean,
    default : false
  }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}