import React from 'react'
import "/src/index.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {motion } from "framer-motion";

function Navbar() {
  let location = useLocation();
  let navigate=useNavigate();
  const handleLogout=()=>{
   

    localStorage.removeItem('token')
    navigate("/login")

  }

  const signintoken=localStorage.getItem("token")
  return (
    <div>
      <nav  style={{background:"transparent"}} className="navbar navbar-expand-lg  navbar-light sticky-top">
  <div className="container-fluid">
  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item" >
          <Link  className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">All Collection</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==='/CollectionCard'?"active":""}`} to="/CollectionCard">Your Collections</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==='/AddCollection'?"active":""}`} to="/AddCollection">Add Collection</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==='/Debitdetails'?"active":""}`} to="/Debitdetails">Debit Details</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==='/Debit'?"active":""}`} to="/Debit">Debit</Link>
        </li>
       
      </ul>

      {!localStorage.getItem('token') ? (
  <div>
    <Link className="btn btn-primary mx-1" to="/login" role="button" >Login</Link>
    
  </div>
) : (
  <Link className="btn btn-sm btn-primary mx-1" onClick={handleLogout} role="button"><motion.button  whileHover={{scale:1}} className="btn btn-primary mx-1"> Logout </motion.button>
  </Link>
)}



    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
