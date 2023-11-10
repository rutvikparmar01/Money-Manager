import React, { useContext, useEffect, useState } from "react";
import "/src/index.css"
import listContext from "../Context/collections/listContext";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";

function AddCollection() {
  const context = useContext(listContext)
  const [note,setNotes]=useState({name:"",amount:""})
  const {addData}=context
 const handleclick= (e)=>{
  e.preventDefault();
  addData(note.name,note.amount)
   toast.success('Successfully added!');
   setNotes({name:"",amount:""})


  }
 const onChange=(e)=>{
    setNotes({...note,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
      addData()
  },[])

  
  return (
    <>
    <div>
      <motion.div 
      initial={{opacity:0,scale:0}}

      animate={{opacity:1,scale:1}}

       className="card container my-3 w-60"  style={{background:'transparent'}}>
        <h5 className="card-header">Add New Collection</h5>
        <div className="card-body">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              className="form-control "
              placeholder="Name"
              value={note.name}
              aria-label="Name"
              aria-describedby="addon-wrapping"
              onChange={onChange}
              id='name'
              name="name"
            />
          </div>
          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
            <i className="fa-solid fa-coins"></i>
            </span>
            <input
              type="text"
              className="form-control "
              placeholder="Amount"
              name='amount'
              value={note.amount}
              id='amount'
              aria-label="Name"
              onChange={onChange}
              aria-describedby="addon-wrapping"
            />
          </div>

         
          <a href="#" className="btn btn-primary" onClick={handleclick}>
           Add Balance
          </a>
          <Toaster />
        </div>
      </motion.div>
    </div>
    </>
  );
}


export default AddCollection;
