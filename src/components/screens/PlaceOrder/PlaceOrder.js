import React, {useState, useEffect} from 'react'
import 'react-dropdown/style.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const PlaceOrder = (props) => {
    const [product_name, setProductName] = useState()
    const [products, setProducts] = useState()
    const [availableProducts, setAvailableProducts] = useState()
    const [availableQuantities, setAvailableQuantities] = useState()
    const [total_bill, setTotalBill] = useState()
    const [quantities, setQuantities] = useState()
    const [freequantities, setFreeQuantities] = useState()
    const [paragraph, setParagraph] = useState('none')
    const [orderArray, setOrderArray] = useState([])
    const [btn,setButton] = useState(true)

    const placeOrder = () =>{
        fetch("https://arush-enterprises-api.adaptable.app/placeneworder",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
            },
            body:JSON.stringify({
                products : orderArray,
                medical : props.medicalId
            })
            }).then(res =>res.json())
            .then(result=>{
                if(result.error){
                    toast.error(result.error,
                    {position:toast.POSITION.TOP_CENTER,
                    autoClose:4000})
                }else{
                    toast.success(result.message,
                                {position:toast.POSITION.TOP_CENTER,
                                autoClose:2000})
                    props.orderupdated ? props.setOrderUpdated(false) : props.setOrderUpdated(true)
                    props.setOrderForm(false)
                }
                
            })
            .catch(err=>{
                console.log(err)
            })
        
    }

    useEffect(()=>{},[btn])

    useEffect(()=>{
        fetch('https://arush-enterprises-api.adaptable.app/allproducts',{
            method : 'get',
            headers : {
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(result =>{
            setAvailableProducts(result)
            var product_names = []
            result.forEach(item=>{
                var item2 = {}
                item2.label = item.product_name
                item2.value = item.product_name
                product_names.push(item2)
            })
            setProducts(product_names)
        })
    },[])

    const SetAvailableQuant = (name) =>{
        availableProducts.forEach(item=>{
            if(item.product_name == name){
                setAvailableQuantities(item.quantities)
            }
        })
    }
    const pushToArray = () =>{
        let item = {}
        item.product_name = product_name
        item.quantities = quantities
        item.freequantities = freequantities
        item.total_bill = total_bill
        orderArray.push(item)
        setProductName('')
        setQuantities('')
        setFreeQuantities('')
        setTotalBill('')
        if(btn){
            setButton(false)
        }
        setParagraph('none')
    }

  return (
    <div className="container mycard">
    <div className="card auth-card input-field">                
        <h2>Order Detail</h2>
        <Select
            options={products}
            onChange={(e)=>{
                SetAvailableQuant(e.value)
                setProductName(e.value)
                setParagraph('block')
                }} /> 
        
        <p style={{color:'green',display:`${paragraph}`}}>{availableQuantities} quantities of {product_name} are available.</p>
        <input
            type = "number"
            placeholder = "Quantities"
            value={quantities}
            onChange={(e) =>setQuantities(e.target.value)}
        />
        <input
            type = "number"
            placeholder = "Free Quantities"
            value={freequantities}
            onChange={(e) =>setFreeQuantities(e.target.value)}
        />
        <input
            type = "number"
            placeholder = "Total Bill"
            value={total_bill}
            onChange={(e) =>setTotalBill(e.target.value)}
        />
        <button className="btn waves-light #64b5f6 blue darken-1"
                style={{margin:10}}
                onClick = {()=>{
                    pushToArray()
                }}>Add</button>
        <button className="btn waves-light #64b5f6 blue darken-1"
            style={{margin:10,display:`${btn?'none':'block'}`}}
            onClick={placeOrder}>
            Place order
        </button>   
        <button className="btn waves-light #64b5f6 red darken-1"
            style={{margin:10}}
            onClick={()=>{props.setOrderForm(false)}}>
            cancel
        </button>      
    </div>
</div>
  );
};

export default PlaceOrder;
