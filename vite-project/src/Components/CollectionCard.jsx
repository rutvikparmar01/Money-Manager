import React, { useContext, useEffect } from "react";
import "/src/index.css";
import listContext from "../Context/collections/listContext";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CollectionCard() {
  const context = useContext(listContext);
  const { getNotes, notes, deleteData } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
      
    } else {
      navigate("/login");
    }
  }, []);

  let total = 0;

  // if(Array.isArray(notes)) {
  notes.forEach((note) => {
    total += note.amount;
  });
  // }

  return (
    <>
      <div>
        <motion.h1
        
        
        >Your Total Balance: {total}</motion.h1>
        {notes.map((e) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background:'transparent' }}
            key={e._id}
            className="card container my-3"
          >
            <div className="card-header">
              <h4> {e.name}</h4>
            </div>

            <div className="card-body">
              <div>
                <p className="card-text">
                  <i className="fa-solid fa-coins"></i> <h3>{e.amount} Rs.</h3>
                </p>
              </div>
              <div className="d-flex flex-row-reverse">
                <motion.i
                whileHover={{scale:2}}
                  className="fa-solid fa-trash-can my-0"
                  onClick={() => {
                    deleteData(e._id);
                  }}
                ></motion.i>
              </div>

              <Toaster />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default CollectionCard;
