import React,{useState,useContext} from "react";
import './CartItem.css'
import CartContext from "../../store/CartContext";

export const CartItem = (props) => {
  const CartCtx = useContext(CartContext);
  const [changeqty,setChangeQty] = useState(props.qty);
  const incHandler=()=>{
      setChangeQty(changeqty+1);
  }
  const decHandler=()=>{
      if(changeqty>0)
          setChangeQty(changeqty-1);
      else
          setChangeQty(0);
  }
  const removeHandler=()=>{
      let Cart = [...CartCtx.cartItems];
      Cart = Cart.filter(cartitem=>cartitem.product_name !== props.product_name);
      console.log(Cart);
      CartCtx.setCartItems(Cart);
  }
  return(
    <div className='row my-4'>
        <div className="col-md-4 px-4 py-4">{props.product_name}</div>
        <div className="col-md-4 px-4 py-4">
            <div className="row">
                <button className="col-md-4 text-end" onClick={incHandler}>+</button>
                <div className="col-md-4">
                    <form>
                        <input type='text' value={changeqty} className='form-control'/>
                    </form>
                </div>
                <button className="col-md-4 text-left font-big" onClick={decHandler}>-</button>
                <button className="remove" onClick={removeHandler}>Remove</button>
        </div>
        </div>
        <div className="col-md-4 px-4 py-4">
        ${Number (props.product_price)*changeqty}
        </div>
    </div>
    );
}
    // const Cartctx = useContext(CartContext);
    // let cartItems = [...Cartctx.cartItems];
    // cartItems = cartItems.filter(cartitem=>cartitem.product_name === props.pname);
    // console.log(cartItems);
    // console.log(cartItems[0]);
    // const inc=()=>{
    //   if(cartItems[0].qty>=1)
    //   {
    //     cartItems[0].qty+=1;
    //     Cartctx.setCartItems([...Cartctx.cartItems])
    //   }
    // }
  // return (
  //   <div className="row my-4">
  //     <div className="col-md-4 px-4 py-4">{props.product_name}</div>
  //     <div className="col-md-4 px-4 py-4">
  //       <div className="row">
  //       <div className="button">
  //           <button className="btn btn-" onClick={inc}>+</button>{props.qty}
  //         </div>
  //         {/* <div className="col-md-4 text-end">+</div> */}
  //         <div className="col-md-4">
  //           <form>
  //             <input type="text" value={props.qty} className="form-control" readOnly />
  //           </form>
  //         </div>
  //         <div className="col-md-4 text-left font-big">-</div>
  //       </div>
  //     </div>
  //     <div className="col-md-4 px-4 py-4">${Number (props.product_price)*props.qty}</div>
  //     {/* <div>Total{props.total}</div> */}
  //   </div>
  // );

