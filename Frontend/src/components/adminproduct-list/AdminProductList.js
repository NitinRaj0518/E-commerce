import React,{useContext, useEffect} from 'react'
import ProductContext from '../../store/ProductContext'
import { AdminProduct } from '../adminproduct/adminlist'
export const AdminProductList = (props) => {
    const ProductCtx = useContext(ProductContext)
    useEffect(()=>{
        getProducts();
    },[ProductCtx.products])
    const getProducts = async() =>{
        const data = await fetch("http://localhost:3001/product/");
        const products_data = await data.json();
        ProductCtx.setProducts(products_data.products);
      }
  return (
    <div>
        <h1>List Product</h1>
        {ProductCtx.products.map((product,index) =>
        <AdminProduct key={index}
        product_id={product._id}
        pname={product.product_name}
        pimage={product.product_image}
        price={product.product_price}
        pdescription={product.product_description}/>
        )}
    </div>
  )
}
