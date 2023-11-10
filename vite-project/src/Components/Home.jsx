

import listContext from "../Context/collections/listContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '/src/index.css'
import { motion } from "framer-motion";

function Home() {
  const context = useContext(listContext);
  const { getAllData,list} = context;
  const navigate =useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllData();
     
     
    }
    else{
      navigate('/login')
    }
   
   
  }, []);
  let total=0;
  let date=""
  list.forEach((note) => {
    total += note.amount;
    date=note.Date.substring(0, 10);
  });
  // let userName = ""; // Initialize userName as an empty string
 
  return (
 
   <>
   <div >



   <motion.h1
  
   >Total Balance : {total}</motion.h1>
   {list.map((e)=>(
  <motion.div style={{background:'transparent'}}
  initial={{opacity:0,y:30}}

      animate={{opacity:1,y:0}}

  className="card container my-3" key={e._id}  >
  <h5 className="card-header" style={{color:'#242582'}}>  <i style={{color:'#242582'}} className="fa-solid fa-user"></i> {e.name}</h5>
  <div className="card-body">
    <h5 className="card-title">  <i className="fa-solid fa-coins"></i> {e.amount}</h5>
    <p className="card-text"> <i className="fa-solid fa-calendar-days"></i>  {date}</p>

   
  </div>
</motion.div>
   ))}
   
   </div>
   </>
  )
}

export default Home
