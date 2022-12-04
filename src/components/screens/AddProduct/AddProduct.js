import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './AddProduct.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const AddProduct = () => {
    const [product_name,setproduct_name] = useState("")
    const [quantities,setquantities] = useState()
    const [amount,setAmount] = useState()
    const navigate = useNavigate()
    
    const postProduct = () =>{
            fetch("https://arush-enterprises-api.adaptable.app/addproduct",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("arushenterpricesjwt")
                },
                body:JSON.stringify({
                    product_name,
                    quantities,
                    amount
                })
                }).then(res =>res.json())
                .then(data =>{
                    if(data.error){
                        toast.error(data.error,
                            {position:toast.POSITION.TOP_CENTER,
                            autoClose:4000})
                    }
                    else{
                        toast.success("Product uploaded Successfully",
                            {position:toast.POSITION.TOP_CENTER,
                            autoClose:2000})
                        navigate('/')
                    }
            }).catch(err=>{
                console.log(err)
            })
    }
    return (
        <div  style={{'background':'white'}} className="mycard">
            <div className="card auth-card input-field">
                <h5>Product Details</h5>   
                <input
                type = "text"
                placeholder = "Name of product"
                value={product_name}
                onChange={(e) =>setproduct_name(e.target.value)}
                />
                <input
                type = "number"
                placeholder = "Quantities"
                value={quantities}
                onChange={(e) =>setquantities(e.target.value)}
                />
                
                <input
                type = "number"
                placeholder = "Total price in Rs"
                value={amount}
                onChange={(e) =>setAmount(e.target.value)}
                />
                <button 
                    style={{margin:"50px 50px 50px 50px"}} 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={postProduct}>
                    Add Product
                </button>      
            </div>
        </div>
    )
}

export default AddProduct
