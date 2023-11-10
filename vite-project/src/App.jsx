import React , {useState} from "react"
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";

import Navbar from "./Components/Navbar";
import CollectionCard from "./Components/CollectionCard";
import AddCollection from "./Components/AddCollection";
import ListState from "./Context/collections/ListState";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import Debititem from "./Components/Debititem";
import AddDebitData from "./Components/AddDebitData";

 

function App() {
 
 
  return (
    <ListState>
   <Router>
<Navbar/>

<Routes>

<Route exact path="/" element={<Home/>}></Route>
<Route  exact path="/CollectionCard" element={<CollectionCard/>}></Route>
<Route exact path='/AddCollection' element={<AddCollection/>}></Route>
<Route exact path='/Debitdetails' element={<Debititem/>}></Route>
<Route exact path='/login' element={<Login/>}></Route>
<Route exact path='/debit' element={<AddDebitData/>}></Route>
<Route exact path='/qW' element={<Signin/>}></Route>
</Routes>


   </Router>
   </ListState>
  )
}

export default App
