const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name:{
        type: String,
        required: true,
    },
    course_price:{
        type: String,
        required: true,
    },
    course_image:{
        type: String,
        required: false,
    },
    course_conducted_by:{
        type: String,
        required: false,
    }
},{timestamps: true})

exports.Course = mongoose.model('course',courseSchema);