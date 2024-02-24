import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
 
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
 
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('authToken');
    if (auth) {
      navigate('/');
    }
  }, []);
  const handelLogin = async(e)=>{
e.preventDefault();
let response = await fetch('https://yum-food-efc9.onrender.com/api/loginUser',{
  method:'POST',
  body:JSON.stringify({email,password}),
  headers:{
      'Content-Type':'application/json'
  }
});
const json = await response.json();
console.log(json);
if(!json.success){
  localStorage.setItem("userEmail",email);

  localStorage.setItem("authToken",json.authToken);
  console.log(localStorage.getItem("authToken"))
  navigate('/');
  
}

  }
  return (
    <div className='container'>
    <form onSubmit={handelLogin}>
    <div className="mb-3">
      <label for="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" value={email} id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label for="exampleInputPassword1" className="form-label" >Password</label>
      <input type="password" className="form-control" value={password} id="exampleInputPassword1"  onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <button  type="submit" className="btn btn-primary">Submit</button>
    </form>

    </div>
  )
}

export default Login