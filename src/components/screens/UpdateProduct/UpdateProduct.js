import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const UpdateProduct = (props) => {
    const{product, setupdateForm, refetch, setRefetch} = props
    const [product_name,setproduct_name] = useState(product.product_name)
    const [quantities,setquantities] = useState(product.quantities)
    const [amount,setAmount] = useState(product.amount)
    const navigate = useNavigate()

    const updateProduct = () =>{
            fetch(`https://arush-enterprises-api.adaptable.app/updateproduct/${product._id}`,{
                method:"put",
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
                    console.log('data',data)
                    if(data.error){
                        toast.error(data.error,
                            {position:toast.POSITION.TOP_CENTER,
                            autoClose:4000})
                    }
                    else{
                        toast.success("Product uploaded Successfully",
                            {position:toast.POSITION.TOP_CENTER,
                            autoClose:2000})
                        setupdateForm(false)
                        refetch? setRefetch(false):setRefetch(true)
                    }
            }).catch(err=>{
                console.log(err)
            })
    }
    return (
        <div className="mycard">
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
                    style={{margin:"20px 50px 15px 50px"}} 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>{
                        updateProduct()
                        }}>
                    Update
                </button> 
                <button 
                    style={{margin:"0px 50px 50px 50px"}} 
                    className="btn waves-effect waves-light #64b5f6 red darken-1"
                    onClick={()=>{
                        setupdateForm(false)
                        }}>
                    Cancel
                </button>      
            </div>
        </div>
    )
}

export default UpdateProduct
