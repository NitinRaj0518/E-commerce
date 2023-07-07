import React ,{useState,useContext, useEffect} from 'react';
import CartContext from '../../store/CartContext';
import './NavBar.css';
import AuthContext from '../../store/AuthContext';
import {Link,useNavigate} from 'react-router-dom';
export const NavBar = () => {
    const AuthCtx = useContext(AuthContext);
    const CartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const [noofItems,setNoofItems] = useState(0);
    useEffect(()=>{
        setNoofItems(CartCtx.cartItems.length)
    },[CartCtx.cartItems]);
    const onLogoutHandler = ()=>{
        AuthCtx.setIsLoggedIn(false);
        navigate('/admin/login');
    }
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home 
            </Link>
          </li>
          <li className="nav-item">
            {!AuthCtx.isLoggedIn ?
                <Link className="nav-link" to="/admin/login">
                Login
                </Link> :
                <a className="nav-link" onClick={onLogoutHandler}>
                Log Out
              </a>
            }
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/register">
              Register 
            </Link>
          </li>
        </ul>
        <div className="p-4">
                <div className="row">
                    <div className="unique">
                        {noofItems}
                    </div>
                    <div className="col-md-8">
                        <Link to='/cart'>
                            <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" className="cart-img"/>
                        </Link>
                    </div>
                </div>
            </div>
        {/* <div className="p-4">
                <div className="row">
                    
                    <div className="col-md-8">
                        <Link to='/cart'>
                        {noofItems}
                        <button type="button" className="btn btn-success" >
                            {<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>}
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-4 fs-6 cart-box text-center">
                        
                    </div>
                </div>
          </div> */}
        {/* <div className='p-4'>
            <div className='row'>
                
            <div className='col-md-8'>
                {noofItems}
            </div>
            <div className='nav-link' >
                    <Link to="/cart">
                        Bag
                    </Link>
                </div>
            <div className='col-md-4'>
                <img src='https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg' className='cart-img'/>
            </div>
        </div> 
      </div> */}
        {/* <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};
