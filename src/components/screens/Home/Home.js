import React, {useEffect,useState,useContext} from 'react'
import {UserContext} from '../../../App'
import Home1 from './Home1';
import Home2 from './Home2';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
    const {state,dispatch} = useContext(UserContext)
    
    return (
        <div>
            {state?<Home1 /> 
            :<Home2 />}
        </div>
    )
}

export default Home

