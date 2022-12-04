import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const {orderId} = useParams()
    const [medical,setMedical] = useState();
    const [data, setData] = useState([]);
    const [payForm, setpayForm] = useState(false)
    const [payBill, setPayBill] = useState()
    const [orderupdated,setOrderUpdated] =useState(false)
    useEffect(()=>{
        fetch(`https://arush-enterprises-api.adaptable.app/orderdetail/${orderId}`,{
            method : 'get',
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
            }
        })
        .then(res => res.json())
        .then(result=>{
            var med = result[0].medical.medical_name
            setMedical(med)
            setData(result[0])
        })
    },[orderId,orderupdated])

    const Pay = () =>{
        fetch(`https://arush-enterprises-api.adaptable.app/payBill/${orderId}`,{
            method : 'post',
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
            },
            body:JSON.stringify({
                payBill
            })
        })
        .then(res => res.json())
        .then(result => {
            if(result.error){
                toast.error(result.error,
                                {position:toast.POSITION.TOP_CENTER,
                                autoClose:4000})
            }
            else{
                orderupdated ? setOrderUpdated(false) : setOrderUpdated(true)
                setpayForm(false)
                toast.success('Payment Successful',
                                {position:toast.POSITION.TOP_CENTER,
                                autoClose:2000})
                setPayBill()
            }
            
        })
    }
    
  return (
      <>
        {medical?<div style={{'background':'white'}}>
            <h2 style={{display: 'flex', 
                                justifyContent: 'center',
                                margin:'20px',
                                marginBottom:'0'}}>{medical}</h2><br></br>
            <h2 style={{display: 'flex', 
                                justifyContent: 'center',
                                margin:'20px',
                                marginBottom:'0',
                                marginTop:'1px'}}>Order : {data.orderDate}</h2><br></br>
            
            {data.products?
            <div className='container mt-3'
                style={{overflow:'scroll'}}>
                    <table className="table table-striped">
                            <thead className='table-dark'>
                            <tr>
                                <th>Sr no</th>
                                <th>Product</th>
                                <th>Quantities</th>
                                <th>Free Quantities</th>
                                <th>Total Bill</th>
                                <th>Paid Bill</th>
                                <th>Pending Bill</th>
                                <th>Pay Bill</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.products.map((item,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.quantities}</td>
                                            <td>{item.freequantities}</td>
                                            <td>{item.total_bill}₹.</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot className='table-dark'>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{data.total_bill}₹.</td>
                                    <td>{data.paid_bill}₹.</td>
                                    <td style={{color:'red'}}>{data.pending_bill}₹.</td>
                                    <td><button className='btn btn-primary'
                                                 onClick={()=>{
                                                    setpayForm(true)}}>Pay</button></td>
                                </tr>
                            </tfoot>
                    </table>
                    <Modal isOpen = {payForm}
                            onRequestClose = {()=>setpayForm(false)}
                            style={{
                                overlay: {
                                  margin: 'auto',
                                  backgroundColor: 'gray'
                                },
                                content: {
                                  position: 'absolute',
                                  marginLeft:'auto',
                                  marginRight:'auto',
                                  top: '200px',
                                  bottom: '40px',
                                  maxHeight:'350px',
                                  maxWidth:'500px',
                                  border: '1px solid #ccc',
                                  background: '#fff',
                                  overflow: 'auto',
                                  WebkitOverflowScrolling: 'touch',
                                  borderRadius: '4px',
                                  outline: 'none',
                                  padding: '20px'
                                }
                              }}>
                                    <div className="container mycard">
                                        <div className="card auth-card input-field"> 
                                        <h2>Pending Bill : {data.pending_bill}</h2>
                                        <input
                                            type = "number"
                                            placeholder = "Amount"
                                            value={payBill}
                                            onChange={(e) =>setPayBill(e.target.value)}
                                        />
                                        <button className="btn waves-light #64b5f6 blue darken-1"
                                                style={{margin:10}}
                                                onClick = {()=>{Pay()}}>
                                                    Pay Bill
                                        </button>
                                        <button className="btn waves-light #64b5f6 red darken-1"
                                                style={{margin:10}}
                                                onClick = {()=>{setpayForm(false)}}>
                                                    Cancel
                                        </button>
                                        </div>
                                    </div>
            </Modal>
            </div>
            
            :<div></div>}
        </div>
        :<div></div>}
      </>
    
  )
}

export default OrderDetail