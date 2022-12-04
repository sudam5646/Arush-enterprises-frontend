import React, {useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './Signin.css'
import logo  from 'images/ArushLogo.png'
import {UserContext} from '../../../App'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import M from 'materialize-css'
const Signin = () => {
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate ()
    const PostData = ()=>{
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            //M.toast({html:"Invalid Email",classes:"#f44336 red"})
            toast.error("Invalid Email",
                {position:toast.POSITION.TOP_CENTER,
                autoClose:4000})
            return
        }
        fetch("https://arush-enterprises-api.adaptable.app/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email:email.toUpperCase()
            })
            }).then(res =>res.json())
            .then(data =>{
                if(data.error){
                    //M.toast({html: data.error,classes:"#f44336 red"})
                    toast.error(data.error,
                        {position:toast.POSITION.TOP_CENTER,
                        autoClose:4000})
                }
                else{
                    localStorage.setItem("arushenterpricesjwt",data.token)
                    localStorage.setItem("arushenterpricesuser",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    //M.toast({html:"signedin successfully",classes:"#8bc34a light-green"})
                    toast.success('Sign in successfull',
                        {position:toast.POSITION.TOP_CENTER,
                        autoClose:3000})
                    navigate('/')
                }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div style={{'background':'white'}}>
            <div className="container mycard">
            <div className="card auth-card input-field">
                <div>
                    <img draggable="false" 
                        height={100} 
                        width={100} 
                        src={logo} 
                        alt='logo'>
                    </img>  
                </div>
                
                <h2>Arush Enterprises</h2>   
                <input
                type = "email"
                placeholder = "email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
                <input
                type = "password"
                placeholder = "password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                />    
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={PostData}>
                    Login
                </button>      
            </div>
        </div>
        </div>
        
        
    )
}

export default Signin
