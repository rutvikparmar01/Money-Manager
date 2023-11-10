import React, { useContext, useEffect, useState } from "react";
import listContext from "../Context/collections/listContext";
import "/src/index.css";
import toast, { Toaster } from 'react-hot-toast';
import {motion} from 'framer-motion'

function AddDebitData() {
    const context = useContext(listContext);
    const [debit,setDebit]=useState({reason:'',amount:'',name:''});
    const {adddebitData}=context;

    const handleclick=(e)=>{
        e.preventDefault();
        adddebitData(debit.reason,debit.amount,debit.name)
        toast.success('Successfully added!');
        setDebit({reason:'',amount:'',name:''})

    }
    const onChange=(e)=>{
        setDebit({...debit,[e.target.name]:e.target.value})

    }
    useEffect(()=>{
        adddebitData();
    },[])
  return (
    <div>
      <motion.div
       
      
      
      className="container">
        <div className="mb-3">
        <span className="input-group-text " id="addon-wrapping">
        <i className="fa-solid fa-pencil fa-xl mx-2"></i>
          <input
            type="text"
            className="form-control"
            id="reason"
            aria-describedby="emailHelp"
            placeholder="Reason"
            name='reason'
            onChange={onChange}
            value={debit.reason}
          />
             </span>

        </div>
        <div className="mb-3">
        <span className="input-group-text " id="addon-wrapping">
      
        <i className="fa-solid fa-money-bill fa-xl mx-2"></i>
          <input
            type="number"
            className="form-control"
            id="amount"
            placeholder="Amount"
            name='amount'
            onChange={onChange}
            value={debit.amount}
          />
              </span>
        </div>
        <div className="mb-3">
        <span className="input-group-text " id="addon-wrapping">
        <i className="fa-solid fa-person fa-xl mx-2"></i>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            name='name'
            onChange={onChange}
            value={debit.name}
          />
              </span>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
         Debit
        </button>
      </motion.div>
      <Toaster/>
    </div>
  );
}

export default AddDebitData;
