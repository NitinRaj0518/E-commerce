import React from 'react';
import './adminlist.css';
import { useNavigate } from 'react-router-dom';
import { Update } from '../updateproduct/Update';

//import CartContext from '../../store/CartContext';
//import { Cart } from '../cart/Cart';
export const AdminProduct = (props)=>{  
    console.log(props)
    const navigate = useNavigate();
    console.log(props.product_id);
    const updateHandler= (event) =>{
        navigate('/update',{ state: { product : props} })
    }
    
    return (
        <div>
            <div className="product_container">
                <div className="product_id">{props.id}</div>
                <div className="product_title">{props.pname}</div>
                <div className='product_image'>
                    <img src={props.pimage}/>
                </div>
                <div className="product_price">{props.price}</div>
                <div className="product_description">{props.pdescription}</div>
                <div className="button" onClick={updateHandler}>
                    <button className="btn btn-">Update</button>
                </div>

            </div>
        </div>
    )
}