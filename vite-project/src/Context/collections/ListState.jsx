import react, { useState } from "react";
import ListContext from "./listContext";
import toast, { Toaster } from "react-hot-toast";

const ListState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = [];
  const listInitial = [];
  const userIntial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [list, setList] = useState(listInitial);
  const [user, setUse] = useState(userIntial);
  const [debit,setDebit]=useState([]);

  //*API Call for fetch all Debit Data------------------------------

  const getAllDebitData=async ()=>{
    const responce = await fetch(`${host}/api/Debit/showdata`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
      
    })
    const json= await responce.json();
    setDebit(json);
    console.log(json);
  }
  //*API for add Debit ---------------------------------
  const adddebitData = async (reason, amount,name) => {
    const response = await fetch(`${host}/api/Debit/addDebit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ reason, amount,name }),
    });
    const json = await response.json();
    console.log(json);
  };

  //* API Call FOR FETCH ALL THE DATA------------------------
  const getNotes = async () => {
    const response = await fetch(`${host}/api/collection/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  //*show all the data

  const getAllData = async () => {
    //* API Call FOR FETCH ALL THE DATA------------------------
    const response = await fetch(`${host}/api/collection/alltheDatafromlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    console.log(json);
    setList(json);
  };

  //*  ADD DATA TO OUR DATABASE----------------------------------

  const addData = async (name, amount) => {
    const response = await fetch(`${host}/api/collection/additem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, amount }),
    });
    const json = await response.json();
    console.log(json);
  };
  //*Getuser Details------------------------
  const getuser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setUse(json);
  };

  //*DELETE DATA ---------------------
  const deleteData = async (id) => {
    const response = await fetch(`${host}/api/collection/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    toast.success("Successfully Deleted!");
  };

  const editData = () => {};

  return (
    <ListContext.Provider
      value={{
        getNotes,
        notes,
        addData,
        deleteData,
        getAllData,
        list,
        getuser,
        user,
        getAllDebitData,
        debit,
        adddebitData
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
