import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({email: "", password: ""});
  const navigate= useNavigate();

  const handlesubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser",{
      method: "POST",
      headers: {
        "Content-Type":"application/json" 
      },
      body:JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    if (!json.success){alert("Enter Valid Credentials")}
    else{
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  }

  const onChange = (e) =>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <button type="submit" className="m-3 btn btn-info">Submit</button>
          <Link to="/signup" className="m-3 btn btn-primary">Sign Up</Link>
        </form>
      </div>
    </>
  )
}
