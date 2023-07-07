import React,{useContext} from 'react';
import './product.css';
import CartContext from '../../store/CartContext';
//import { Cart } from '../cart/Cart';
export const Product = (props)=>{
    const CartCtx = useContext(CartContext);
    const buynowHandler =() =>{
        const cartObject = {
            product_name: props.pname,
            qty:1,
            product_price: props.price
        }

        let CartItems = [...CartCtx.cartItems];
        CartItems = CartItems.filter(cartitem=>cartitem.product_name === props.pname)
        if(CartItems.length > 0){
            CartItems[0].qty = CartItems[0].qty+1
        }
        else{
            CartCtx.setCartItems([...CartCtx.cartItems,cartObject])
        }
        console.log(CartCtx.cartItems);

    }
    return (
        <div>
            <div className="product_container">
                <div className="product_title">{props.pname}</div>
                <div className='product_image'>
                    <img src={props.pimage}/>
                </div>
                <div className="product_price">{props.price}</div>
                <div className="product_description">{props.pdescription}</div>
                <div className='button_container'>
                    <button className="buy_now" onClick={buynowHandler}>Buy Now</button>
                </div>

            </div>
        </div>
    )
}