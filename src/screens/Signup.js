import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[location,setLocation] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate('/')
        }
    })
    const handleSubmit = async(e)=>{
e.preventDefault();
let response = await fetch('https://yum-food-efc9.onrender.com/api/createUser',{
    method:'POST',
    body:JSON.stringify({name,email,password,location}),
    headers:{
        'Content-Type':'application/json'
    }
});
response = await response.json()
localStorage.setItem("users",JSON.stringify(response));
navigate('/')
    }
  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='mt-5'>
     <div className="mb-3">
      <label for="name" className="form-label" >Name</label>
      <input type="text" className="form-control" value={name}  onChange={(e)=>setName(e.target.value)} />
     
    </div>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" value={email} id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label" >Password</label>
      <input type="password" className="form-control" value={password} id="exampleInputPassword1"  onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label for="name" className="form-label" >Address</label>
      <input type="text" className="form-control" value={location}  onChange={(e)=>setLocation(e.target.value)} />
     
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to="/login" className='m-3 btn btn-danger'>Aleday User</Link>
  </form></div>
  )
}

export default Signup