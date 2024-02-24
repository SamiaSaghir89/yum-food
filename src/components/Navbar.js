import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {CiBurger } from "react-icons/ci";
import Badge from 'react-bootstrap/Badge';
import './style.css'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
 const[cartView,setCartView] = useState(false)
 let data = useCart()
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate('/')
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-pink">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1" to='/'><CiBurger style={{width:'60px'}} />YumFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {localStorage.getItem("authToken") && (
  <li className="nav-item">
    <Link className="nav-link " aria-current="page" to="/myOrder">My Orders</Link>
  </li>
)}


        
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
     
          <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
      
        
          <Link className="btn bg-white text-success mx-1" to="/signUp">Signup</Link>
       </div>
         :
         <div>
         <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>
         My Cart {" "}
         <Badge pill bg='danger'>{data.length}</Badge>
          </div>
          {cartView?<Modal OnClose={()=>setCartView(false)}><Cart/></Modal>:null}
          <div className="btn bg-white text-danger mx-2">
          <Link  onClick = {logout}   to="/">Logout </Link>
          </div>
          </div>
          }
      </div>
    </div>
 
</nav>
    </div>
  )
}

export default Navbar