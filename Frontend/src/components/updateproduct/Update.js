import { useLocation } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
import "./Update.css";
export const Update = () =>{
    const { state } = useLocation();
    const { product } = state;
    const id= product.product_id;
    // console.log(product);
    //const [er,setEr] = useState('')
    const [err, setErr] = useState({
        isError: false,
        message: "",
      });
    const [formInput,setFormInput] = useState({
        productName:'',
        productPrice:'', 
        productImage:'',
        productDescription:''
    })
    const productNameHandler = (event) => {
        setFormInput({
            ...formInput,
            productName:event.target.value
        })
    }
    const productPriceHandler = (event) => {
        setFormInput({
            ...formInput,
            productPrice:event.target.value
        })
    }
    const productImageHandler = (event) => {
        setFormInput({
            ...formInput,
            productImage:event.target.value
        })
    }
    const productDescriptionHandler = (event) => {
        setFormInput({
            ...formInput,
            productDescription:event.target.value
        })
    }
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if(formInput.productName == ''){
            setErr({
             isError: true,
             message:'Product name is required'
            })
        }
         else if(formInput.productPrice == ''){
             setErr({
                 isError: true,
                 message:'Product price is required'
             })
        }
        else{
            setErr({
                isError: false,
                message:''
            })
            await saveproductdata(formInput);
        }
       
    }
    const saveproductdata = async (formData) => {
        
        const produc = {
            product_name : formData.productName,
            product_description : formData.productDescription,
            product_price : formData.productPrice,
            product_image : formData.productImage
        }
        const message = await axios.put('http://localhost:3001/product/update/'+id,produc,{
            header:{
                'Content-Type': 'application/json'
            }
        })
        .catch(error=>{
            console.log(`From Error`,err.message)
        });
    }
    return(
        <div className="update-form">
            <form  onSubmit={formSubmitHandler}>
            {err.isError ? <div>{err.message}</div> : null}
                <div className="id">{product.product_id}</div>
                <div className="form-input">
                    <input type="text" placeholder={product.pname} className="name"  onChange={productNameHandler}></input>
                </div>
                <div className="form-input">
                    <input type="text" placeholder={product.pimage} className="image" onChange={productImageHandler}></input>
                </div>
                <div className="form-input">
                    <input type="text" placeholder={product.price} className="price"  onChange={productPriceHandler}></input>
                </div>
                <div className="form-input">
                    <input type="text" placeholder={product.pdescription} className="description" onChange={productDescriptionHandler}></input>
                </div>
                <div className="product-button">
                    <button type="submit" className="submit">Update</button>
                </div>
            </form>
        </div>
               
    )
}