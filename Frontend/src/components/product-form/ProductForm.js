import React, {useContext, useState } from "react";
import "./product-form.css";
import axios from "axios";
import ProductContext from "../../store/ProductContext";

const ProductForm = (props) => {
    const ProductCtx = useContext(ProductContext);
  const [formInput, setFormInput] = useState({
    productName: "",
    productPrice: "",
    productImage: "",
    productDescription: "",
  });

  const [err, setErr] = useState({
    isError: false,
    message: "",
  });

  const productNameHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productName: event.target.value,
      };
    });
  };
  const productPriceHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productPrice: event.target.value,
      };
    });
  };
  const productImageHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productImage: event.target.value,
      };
    });
  };
  const productDescriptionHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productDescription: event.target.value,
      };
    });
  };
  const formSubmitHandler = async (event) => {
    
    let error = "";
    if (formInput.productName == "") {
      setErr({
        isError: true,
        message: "Enter product name",
      });
      event.preventDefault();
      //error='Please enter the product name'
      //prompt(error);
    } else if (formInput.productPrice == "") {
      setErr({
        isError: true,
        message: "Enter product Price",
      });
      event.preventDefault();
      //error='Please enter the product name'
      //prompt(error);
    } else {
      setErr({
        isError: false,
        message: "",
      });
      saveProductData(formInput);
      event.preventDefault();
      //props.onProductAdded(true);
      //props.onProductAdded(formInput);
    }
    // if(error==''){
    //     console.log(formInput);
    //     props.onProductAdded(formInput)
    //     event.preventDefault();
    // }
  };

  const saveProductData = async (formData) => {
    try{
        const product = {
            product_name: formData.productName,
            product_price: formData.productPrice,
            product_image: formData.productImage,
            product_description: formData.productDescription,
          }
          const result = await axios.post("http://localhost:3001/product/add",product,{
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          console.log(result)
          ProductCtx.setProducts([...ProductContext.products,product])
    }catch(err){
        console.log(`From Error`,err.message)
    }
    
  }

  return (
    <div className="form-container">
      <h1>Add New Product</h1>
      <form onSubmit={formSubmitHandler}>
        {err.isError ? <div>{err.message}</div> : null}
        <div className="form-input">
          <input
            type="text"
            placeholder="Product Name"
            onChange={productNameHandler}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Product price"
            onChange={productPriceHandler}
          />
        </div>
        <div className="clearfix"></div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Product image"
            onChange={productImageHandler}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Product Description"
            onChange={productDescriptionHandler}
          />
        </div>
        <div className="clearfix"></div>
        <div className="form-input">
          <button className="btn_add_product">Add Product</button>
        </div>
        <div className="clearfix"></div>
      </form>
    </div>
  );
};

export default ProductForm;
