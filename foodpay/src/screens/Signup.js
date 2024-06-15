import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Signup() {
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", location: ""});

  const handlesubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser",{
      method: "POST",
      headers: {
        "Content-Type":"application/json" 
      },
      body:JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.location,
        password: credentials.password
      })
    });
    const json = await response.json();
    if (!json.success){alert("Enter Valid Credentials")}
    else{
      alert("Sign Up Successful.")
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
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" name='name' value={credentials.name} onChange={onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" placeholder="Enter your location" name='location' value={credentials.location} onChange={onChange}/>
          </div>
          <button type="submit" className="m-3 btn btn-info">Submit</button>
          <Link to="/login" className="m-3 btn btn-primary">Already a User</Link>
        </form>
      </div>
    </>
  )
}
