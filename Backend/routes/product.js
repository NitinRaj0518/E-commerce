const express = require("express");
const fs = require("fs");
const { start } = require("repl");
const { uuid } = require("uuidv4");
const { Product } = require("../models/Product");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      message: "products retrieved successfully",
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.post("/add",async (req, res) => {
  try {
    let error = "";
    const { product_name, product_image, product_price, product_description } =
      req.body;
    if (product_name == "" && error == "") {
      error = "Missing Product Name";
      return res.status(400).json({
        message: error,
      });
    }
    if (product_price == "" && error == "") {
      error = "Missing Product Price";
      return res.status(400).json({
        message: error,
      });
    }
    const productObj = {
      product_name,
      product_image,
      product_price,
      product_description,     
    };
    const product = new Product(productObj);

    await product.save();
    res.status(200).json({
      message: "Product saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// app.post("/add",(req,res)=>{
//     try{
//         const filearray = fs.readdirSync(__dirname);
//         let products = [];
//         let error = '';
//         if(filearray.includes('products.json'))
//             products = JSON.parse(fs.readFileSync('products.json'));
//         const {product_name,product_price,product_description,product_image} = req.body
//         if(product_name=='' && error == ''){
//             error = "Missing Product Name"
//             res.statusCode = 404
//             res.end()
//         }
//         if(product_price=='' && error == ''){
//             error = "Missing Product Price"
//            res.statusCode = 400;
//         }
//         if(product_name!='' || product_price!=''){
//             const product = new Product(uuid(),product_name,product_price,product_description,product_image);
//         products = [...products, product];

//         fs.writeFile('products.json', JSON.stringify(products),(err)=>{
//             if(err)
//             res.statusCode = 500;
//             else
//             res.statusCode = 200;
//         })}
//     }catch(err){
//         res.statusCode = 500;
//     }
//     res.send()

// })

router.put("/update/:id", async (req, res) => {
  try {
    let error = "";
    const id = req.params.id;
    const { product_name, product_price, product_description, product_image } =
      req.body;
    if (product_name == "" && error == "") {
      error = "Missing Product Name";
      return res.status(400).json({
        message: error,
      });
    }
    if (product_price == "" && error == "") {
      error = "Missing Product Price";
      return res.status(400).json({
        message: error,
      });
    }

    //update by findByIdAndUpdate
    await Product.findByIdAndUpdate(id, {
      product_name,
      product_image,
      product_price,
      product_description,      
    });
    return res.status(200).json({
      message: "product updated successfully",
    });

    //update by findById
    // const product= await Product.findById(id);
    // product.product_name=product_name;
    // product.product_price=product_price;
    // product.product_description=product_description;
    // product.product_image=product_image;
    // await product.save();
    // return  res.status(200).json({
    //     message:"product updated successfully"
    // })
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

// router.put("/update/:id",(req,res)=>{
//     const { id }=req.params
//     const {name,price,description,link} = req.body;
//     let product_array = JSON.parse(fs.readFileSync('products.json'));
//     product_array=product_array.filter(prod=>prod.id!=id);
//     product_array=[...product_array,{name,price,description,link}];
//     fs.writeFile('products.json',JSON.stringify(product_array),(err)=>{
//         if(err)
//             return res.status(500).json({
//                 message:"Something went wrong",
//                 error:err
//             })
//             return res.status(200).json({
//                 message:" Product updated successfully",
//             })
//     })
// })

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

module.exports = router;

// router.delete('/delete/:id',(req,res)=>{
//     const id=req.params.id;
//     let prodarray=JSON.parse(fs.readFileSync('products.json'));
//     prodarray=prodarray.filter(prod=>prod.id!=id);
//     fs.writeFile('products.json',JSON.stringify(prodarray),(err)=>{
//         if(err)
//             return res.status(500).json({
//                 message:"Something went wrong",
//                 error:err
//             })
//             return res.status(200).json({
//                 message:" Product with the given id is deleted successfully",
//             })
//      })
// })
