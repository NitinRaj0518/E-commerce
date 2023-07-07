import React ,{useState,useContext} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../../store/AuthContext";
//import './login.css'

export const Login = () => {
    const AuthCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [errmsg,setErrMsg] = useState('');
    const [user,setUser] = useState({
        email:'',
        password:'',
    })
    const emailHandler = (event)=>{
        setUser((prevState)=>{
            return{
                ...prevState,
                email:event.target.value
            }
        })
    }
    const passwordHandler = (event)=>{
        setUser((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
    const loginHandler = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:3001/user/login',user,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            AuthCtx.setIsLoggedIn(true);
            //navigate('/admin/product/add');
            navigate('/admin/productlist');
        })
        .catch(error=>{
            setErrMsg(error.response.data.message)
        })
    }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="small-box mx-auto">
              <form onSubmit={loginHandler}>
                <div className="form-container p-4 mx-auto">
                    {errmsg !=='' && 
                    <div className='alert alert-danger'>{errmsg}</div>
                    } 
                  <h1>Login</h1>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={emailHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      onChange={passwordHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <input type="submit" className="btn btn-primary" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React from 'react'

// export const Login = (props) => {
//   return (
//     <div>
//         <section className="vh-100">
//   <div className="container py-5 h-100">
//     <div className="row d-flex align-items-center justify-content-center h-100">
//       <div className="col-md-8 col-lg-7 col-xl-6">
//         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
//           className="img-fluid" alt="Phone image"/>
//       </div>
//       <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
//         <form>
//            Email input
//           <div className="form-outline mb-4">
//             <input type="email" id="form1Example13" className="form-control form-control-lg" />
//             <label className="form-label" for="form1Example13">Email address</label>
//           </div>

//            Password input
//           <div className="form-outline mb-4">
//             <input type="password" id="form1Example23" className="form-control form-control-lg" />
//             <label className="form-label" for="form1Example23">Password</label>
//           </div>

//           <div className="d-flex justify-content-around align-items-center mb-4">
//              Checkbox
//             <div className="form-check">
//               <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
//               <label className="form-check-label" for="form1Example3"> Remember me </label>
//             </div>
//             <a href="#!">Forgot password?</a>
//           </div>

//            Submit button
//           <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

//           <div className="divider d-flex align-items-center my-4">
//             <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
//           </div>

//           <a className="btn btn-primary btn-lg btn-block" style="background-color: #3b5998" href="#!"
//             role="button">
//             <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
//           </a>
//           <a className="btn btn-primary btn-lg btn-block" style="background-color: #55acee" href="#!"
//             role="button">
//             <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>

//         </form>
//       </div>
//     </div>
//   </div>
// </section>
//     </div>
//   )
// }
