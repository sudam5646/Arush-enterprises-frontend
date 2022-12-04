import React, {useState} from 'react'
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'

const AddMedical = () => {
    const [medical_name,setMedical_name] = useState("")
    const [contact,setContact] = useState()
    const [address,setAddress] = useState()
    const navigate = useNavigate()
    
    const postMedical = () =>{
            fetch("https://arush-enterprises-api.adaptable.app/addmedical",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("arushenterpricesjwt")
                },
                body:JSON.stringify({
                    medical_name,
                    address,
                    contact
                })
                }).then(res =>res.json())
                .then(data =>{
                    if(data.error){
                        alert(data.error)
                        M.toast({html: data.error,classes:"#f44336 red "})
                    }
                    else{
                        M.toast({html:"Product uploaded Successfully",classes:"#8bc34a light-green"})
                        console.log(data)
                        navigate('/viewmedical')
                    }
            }).catch(err=>{
                console.log(err)
            })
    }
    return (
        <div style={{'background':'white'}} className="mycard">
            <div className="card auth-card input-field">
                <h5>Medical Details</h5>   
                <input
                style={{margin:'10px'}}
                type = "text"
                placeholder = "Name of Medical"
                value={medical_name}
                onChange={(e) =>setMedical_name(e.target.value)}
                />
                <input
                style={{margin:'10px'}}
                type = "text"
                placeholder = "Contact Number"
                value={contact}
                onChange={(e) =>setContact(e.target.value)}
                />
                <p>address</p>
                <textarea
                style={{height:'100px'}}
                type = "text"
                placeholder = "address"
                value={address}
                onChange={(e) =>setAddress(e.target.value)}
                />
                <button 
                    style={{margin:"50px 50px 50px 50px"}} 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={postMedical}>
                    Add Medical
                </button>      
            </div>
        </div>
    )
}

export default AddMedical
