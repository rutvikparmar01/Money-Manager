import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import '/src/index.css'
import {motion} from 'framer-motion'
import img from "../assets/cat-2536662_1280.jpg"


function Login() {
  const [auth, setAuth] = useState({ email: "", password: "" });
  const navigate =useNavigate();
  const onSubmit = async () => {
    const host = "http://localhost:3000"; 
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: auth.email, password: auth.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.succesc){
      localStorage.setItem("token",json.token)
      navigate('/')
    }
    else{
      toast.error('Please enter valid inputs');

    }
   
  };

  const onChange = (e) => {
    e.preventDefault();
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <div >
   
      <motion.form 
      initial={{opacity:0,y:30}}
      animate={{opacity:1,y:0}}
       style={{background:'transparent'}} className="container my-3 w-75 border border-dark p-3 rounded" >
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" name="email" onChange={onChange} value={auth.email} required />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control" name="password" value={auth.password} onChange={onChange} minLength={5} required />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <button type="button" className="btn btn-primary btn-block mb-4" onClick={onSubmit}>
          Sign in
        </button>
        <Toaster/>
      </motion.form>
     
    </div>
  );
}

export default Login;
