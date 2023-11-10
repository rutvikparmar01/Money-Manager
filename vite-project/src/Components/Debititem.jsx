import React, { useContext, useEffect } from 'react'
import listContext from '../Context/collections/listContext'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Debititem() {
    const context = useContext(listContext);
    const {getAllDebitData,debit}=context;
    
const navigate=useNavigate();

useEffect(()=>{
    if(localStorage.getItem('token')){
        getAllDebitData();
       
    }
    else{
        navigate('/login')
    }
},[])
let total=0;
let date=""
debit.forEach((note) => {
  total += note.amount;
  date=note.Date.substring(0, 10);
});

  return (
    <div>
       <motion.h1 style={{color:"#393646"}}
   
   >Total Debit : {total} Rs.</motion.h1>
   {debit.map((e)=>(
  <motion.div style={{background:'transparent'}}
  initial={{opacity:0,y:30}}

      animate={{opacity:1,y:0}}

  className="card container my-3" key={e._id}  >
  <h5 className="card-header" style={{color:'#242582'}}>  <i style={{color:'#242582'}} className="fa-solid fa-user"></i> Debit By : {e.name}</h5>
  <div className="card-body">
    <p>Reason: {e.reason}</p>
    <h5 className="card-title">  <i className="fa-solid fa-coins"></i> {e.amount} Rs.</h5>
    <p className="card-text"> <i className="fa-solid fa-calendar-days"></i>  {date}</p>

   
  </div>
</motion.div>
   ))}
    </div>
  )
}

export default Debititem
