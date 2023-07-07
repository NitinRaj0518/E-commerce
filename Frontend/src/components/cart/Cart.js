import React, {useContext, useEffect } from "react";
import { CartItem } from "../cart-item/CartItem";
import CartContext from "../../store/CartContext";
export const Cart = () => {
    const CartCtx = useContext(CartContext);
    
  return (
    <div className="container">
      <div className="cart-box mx-auto m-4">
        {CartCtx.cartItems.map((item,index)=>
        <CartItem product_name={item.product_name} product_price={item.product_price} qty = {item.qty} total={item.total} key = {index}/>
        )}
      </div>
    </div>
  );
};
