const express = require("express");
const fs = require("fs");
//const { start } = require('repl');
const { uuid } = require("uuidv4");
const { Course } = require("../models/Course");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const course_name = req.params.course_name;
    const course = await Course.findOne({ course_name: req.params.name });
    return res.status(200).json({
      message: "Fetched",
      course,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/add", Auth, async (req, res) => {
  try {
    //console.log("Reached the add route");
    let error = "";
    const { course_name, course_price, course_image, course_conducted_by } =
      req.body;
    if (course_name == "" && error == "") {
      error = "Missing Course Name";
      res.status(400).json({
        message: error,
      });
    }
    if (course_price == "" && error == "") {
      error = "Missing price ";
      res.status(400).json({
        message: error,
      });
    }
    const courseObj = {
      course_name: course_name,
      course_price: course_price,
      course_image: course_image,
      course_conducted_by: course_conducted_by,
    };

    const course = new Course(courseObj);
    await course.save();
    res.status(200).json({
      message: "Course saved successfully",
      //result
    }); /*.then((result)=>{
        return res.status(200).json({
            message:'Course saved successfully',
            result
        })
    })
    .catch((err)=>{
        return res.status(500).json({
            message:'Something went wrong',
            error:err.message
    })
})*/
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { course_name, course_price, course_image, course_conducted_by } =
      req.body;
    await Course.findByIdAndUpdate(id, {
      course_name,
      course_price,
      course_image,
      course_conducted_by,
    });
    return res.status(200).json({
      message: "Course updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// router.get('/:name',async (req,res)=>{
//     try{
//         const course_name = req.params.course_name;
//         const course = await Course.findOne({course_name:req.params.name});
//         res.status(200).json({
//             message:"Data "
//         })
//     }
// })

router.delete("/delete/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Data Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",

      error: err.message,
    });
  }
});
module.exports = router;
