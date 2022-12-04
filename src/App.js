import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {createContext,useReducer,useContext,useEffect, useState} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Modal from 'react-modal';
import Home from './components/screens/Home/Home';
import Signin from './components/screens/Signin/Signin';
import NavBar from 'components/navbar/Navbar';
import AddProduct from 'components/screens/AddProduct/AddProduct';
import AddMedical from 'components/screens/Medicals/AddMedical';
import ViewMedicals from 'components/screens/Medicals/ViewMedicals';
import MedicalDetail from 'components/screens/Medicals/MedicalDetail';
import OrderDetail from 'components/screens/orderDetail/OrderDetail';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () =>{
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("arushenterpricesuser"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
  },[])
  if(state){
    return(
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/addproduct' element = {<AddProduct />} />
        <Route path = '/addmedical' element = {<AddMedical />} />
        <Route path = '/viewmedical' element = {<ViewMedicals />} />
        <Route path = '/viewmedical/:medicalId' element = {<MedicalDetail />} />
        <Route path = '/orderdetail/:orderId' element = {<OrderDetail />} />
      </Routes>
    )
  }else{
    return(
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/signin' element = {<Signin />} />
      </Routes>
    )
  }
  
}

Modal.setAppElement('#root')
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div style={{overflow:'hidden',background:"#0d2630"}} className="App">
      <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <NavBar /><br></br><br></br><br></br>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
      
    </div>
  );
}

export default App;
