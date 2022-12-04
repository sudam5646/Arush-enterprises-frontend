import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Modal from 'react-modal'
import PlaceOrder from '../PlaceOrder/PlaceOrder'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const MedicalDetail = () => {
    const {medicalId} = useParams()
    const [data, setData] = useState([]);
    const [medical,setMedical] = useState();
    const [orderForm, setOrderForm] = useState(false);
    const [orderupdated,setOrderUpdated] =useState(false)

    useEffect(()=>{
        fetch(`https://arush-enterprises-api.adaptable.app/orders/${medicalId}`,{
            method : 'get',
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
            }
        })
        .then(res => res.json())
        .then(result=>{
            setMedical(result[0].medical)
            if(result[0]._id){
                setData(result)
            }
            
        })
    },[medicalId,orderupdated])

    const deleteOrder = (orderId) =>{
        const delete_request =  window.confirm("This order will be deleted permanently")
        if(delete_request && orderId){
            fetch(`https://arush-enterprises-api.adaptable.app/deleteorder/${orderId}`,{
                method:'delete',
                headers : {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
                }
            })
            .then(res => res.json())
            .then(result => {
                    orderupdated ? setOrderUpdated(false) : setOrderUpdated(true)
                    toast.error(result.message,
                                    {position:toast.POSITION.TOP_CENTER,
                                    autoClose:2000})
            })
        }
        
    }
    return (
        <>
            { medical?
                <div style={{'background':'white'}}>
                    <h2 style={{display: 'flex', 
                                justifyContent: 'center',
                                margin:'20px',
                                marginBottom:'0'}}>{medical.medical_name}</h2><br></br>
                    <span style={{display: 'flex', 
                                justifyContent: 'center',
                                margin:'0px',
                                marginBottom:'10px'}}>
                       <button type="button" 
                                className="btn btn-primary"
                                onClick={()=>{setOrderForm(true)}}>Place Order</button> 
                    </span>
                    <Modal isOpen = {orderForm}
                            onRequestClose = {()=>setOrderForm(false)}
                            style={{
                                overlay: {
                                  margin: 'auto',
                                  backgroundColor: 'gray'
                                },
                                content: {
                                  position: 'absolute',
                                  marginLeft:'auto',
                                  marginRight:'auto',
                                  top: '100px',
                                  bottom: '40px',
                                  maxHeight:'500px',
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
                        <PlaceOrder setOrderForm = {setOrderForm} medicalId = {medicalId} orderupdated = {orderupdated} setOrderUpdated = {setOrderUpdated} />
                    </Modal>
                    {data.length?<div className='container mt-3'
                        style={{overflow:'scroll'}}>
                        <table className="table table-striped">
                            <thead className='table-dark'>
                            <tr>
                                <th>Sr no</th>
                                <th>Order Date</th>
                                <th>Total Bill</th>
                                <th>Paid Bill</th>
                                <th>Pending Bill</th>
                                <th>Order Detail</th>
                                <th>Cancel Order</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.map((item,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{(item.orderDate).toLocaleString('en-GB')}</td>
                                            <td>{item.total_bill}₹.</td>
                                            <td>{item.paid_bill}₹.</td>
                                            <td style={{color:'red'}}>{item.pending_bill}₹.</td>
                                            <td>
                                                <Link to={`/orderdetail/${item._id}`}><button>View</button></Link>
                                            </td>
                                            <td>
                                                <button onClick={()=>{
                                                                        deleteOrder(item._id)
                                                                    }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>:<h3>no orders yet</h3>}
                    
                    
                </div>:<h2>loading...</h2>
            }
        </>
        
    )
}

export default MedicalDetail
