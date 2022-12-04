import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo  from 'images/ArushLogo.png'
import {UserContext} from '../../App'
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar = () => {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(UserContext)
    const [menu,setMenu] = useState(false);
    const [show,setShow] = useState("");
    const toggleMenu = () =>{
        setMenu(!menu);
    }

    useEffect(()=>{
        const show2 = menu?"show":"";
        setShow(show2);
    },[menu,state])
    if(state){
        return (
            <>
            <nav style={{zIndex:9999,padding:"0", width:'100%',position:'fixed','marginBottom':'0','height':'70px'}} 
                className=" navbar navbar-expand-lg navbar-light bg-dark">
                <Link className="navbar-brand" 
                    to="/">
                    <p style={{textAlign:"center",margin:"0 0 0 10px"}}>
                        <img draggable="false" 
                            height={50} 
                            width={50}
                            src={logo} 
                            alt='logo'
                            onClick={()=>
                                {
                                    if(show)toggleMenu()
                                }}>
                        </img>
                    </p>
                    
                </Link>
                
                
                <div style={{'marginTop':'0'}} className={"collapse navbar-collapse bg-dark " + show}>
                    <div className="navbar-nav">
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/">Home</Link>
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/viewmedical">Medicals</Link>
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/addproduct">Add Product</Link>
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/addmedical">Add Medical</Link>
                        <Link 
                            onClick = {()=>{
                                toggleMenu();
                                localStorage.clear()
                                dispatch({type:"CLEAR"})
                            }}
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/signin">
                            logout
                        </Link>
                    </div>
                </div>
                {/* <input
                    style={{width:'50%',background:'#dededc',
                            borderRadius:'10px',margin:'0px 0px 10px 10px',
                            position:'fixed',top:'10px',right:'80px'}}
                    type='text'
                    placeholder="Search">
                </input> */}
                <button
                    style={{position:'fixed',top:'10px',right:'10px'}}
                    className="navbar-toggler" type="button" onClick={ toggleMenu }>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            </>
            );
    }else{
        return (
            <>
            <nav  style={{zIndex:9999,padding:"0", width:'100%',position:'fixed','marginBottom':'0','height':'70px'}}
                className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link className="navbar-brand" 
                    to="/">
                    <p style={{textAlign:"center",margin:"0 0 0 10px"}}>
                        <img draggable="false" 
                            height={50} 
                            width={50}
                            src={logo} 
                            alt='logo'>
                        </img>
                    </p>
                    
                </Link>
                <button className="navbar-toggler" 
                        type="button" 
                        onClick={ toggleMenu }>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse bg-dark " + show}>
                    <div className="navbar-nav">
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/">Home</Link>
                        <Link onClick={toggleMenu} 
                            style={{color:"white",textAlign:"center"}}  
                            className="nav-item nav-link" 
                            to="/signin">Signin</Link>
                    </div>
                </div>
            </nav>
            </>
            );
    }
    
}

export default NavBar
