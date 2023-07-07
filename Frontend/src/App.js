//import { useState, useEffect } from "react";
import ProductForm from "./components/product-form/ProductForm";
import Register from "./components/admin/register/Register";
//import { Product } from "./components/product/Product";
//import { EffectExample } from "./components/EffectExample";
import { ProductList } from "./components/product-list/ProductList";
import { ProductState } from "./store/ProductState";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Cart } from "./components/cart/Cart";
import { Login } from "./components/admin/login/Login";
import { NavBar } from "./components/navbar/NavBar";
import { CartState } from "./store/CartState";
import { AuthState } from "./store/AuthState";
import { ProtectRoute } from "./components/admin/ProtectRoute";
import { AdminProduct } from "./components/adminproduct/adminlist";
import { AdminProductList } from "./components/adminproduct-list/AdminProductList";
import { Update } from "./components/updateproduct/Update";
//import ProductForm from "./components/product-form/ProductForm";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <ProductState>
        <CartState>
          <AuthState>
        <NavBar/>
          <Routes>
            <Route path="/update" element={<Update/>}/>
            <Route path="/" element={<ProductList />} />            
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/admin/login" element={<Login/>} />
            <Route element={<ProtectRoute/>}>
              <Route path="/admin/productlist" element={<AdminProductList/>}/>
              {/* <Route path="/admin/product/add" element={<ProductForm />} /> */}
            </Route>
          </Routes>
          </AuthState>
        </CartState>
      </ProductState>
    </div>
  );
}

export default App;
