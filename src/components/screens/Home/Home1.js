import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Home1 = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [updateForm, setupdateForm] = useState(false);
    const [refetch, setRefetch] = useState(false)
    const [product, setProduct] = useState();
    //http://localhost:5000/
    useEffect(()=>{
        fetch('https://arush-enterprises-api.adaptable.app/allproducts',{
            method : 'get',
            headers:{
                "Content-Type":"application/json"
            },
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                alert(result.error)
            }
            else{
                    setData(result)
                    setLoading(true)
                }
        })
        .catch(err=>{
            console.log(err)
        })
    },[refetch])

    const fetchByTitle = (productname) =>{
        fetch("https://arush-enterprises-api.adaptable.app/searchbytitle",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("arushenterpricesjwt")
            },
            body:JSON.stringify({
                productname
            })
            }).then(res =>res.json())
            .then(data=>{
                if(data.error){
                    toast.error(data.error,
                        {position:toast.POSITION.TOP_CENTER,
                        autoClose:4000})
                }
                else if(!data.length){
                    alert("No product found")
                }
                else{
                    setData(data)
                    setLoading(true)
                }
            })
    }

    // const deleteProduct = (productId) =>{
    //     const delete_request =  window.confirm("This product will be deleted permanently")
    //     console.log(productId)
    //     if(delete_request && productId){
    //         fetch(`/deleteproduct/${productId}`,{
    //             method:'delete',
    //             headers : {
    //                 "Content-Type":"application/json",
    //                 "Authorization":"Bearer " + localStorage.getItem('arushenterpricesjwt')
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(result => {
    //                 refetch ? setRefetch(false) : setRefetch(true)
    //                 toast.error(result.message,
    //                                 {position:toast.POSITION.TOP_CENTER,
    //                                 autoClose:2000})
    //         })
    //     }
    // }
    return (
        <div style={{background:"#0d2630"}}>
            <div style={{'background':'white',width:'80%',margin:'15px auto', 'border':'solid','borderRadius':'10px','paddingLeft':'10px', 'paddingRight':'10px','height':'50px'}}>
                <input type='text' placeholder = 'Search' onChange={(e)=>fetchByTitle(e.target.value)}></input>
            </div>
            {loading && data.length ?
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col p-3 text-white" style={{'backgroundColor':'#42218f'}}>Product Name</div>
                    <div className="col p-3 text-white center" style={{'backgroundColor':'#42218f'}}>Quantities</div>
                    <div className="col p-3" style={{'backgroundColor':'#42218f'}}></div>
                {
                    data.map(item=>{
                        return(
                            <div className="container mt-1" key={item._id}>
                                <div style={{margin:"0"}} className="row">
                                    <div className="col p-2 text-white">{item.product_name}</div>
                                    <div className="col p-2 text-white center">{item.quantities}</div>
                                    <div className="col p-2 text-white center">
                                            <button 
                                                className='btn btn-info'
                                                onClick={()=>{
                                                    setProduct(item)
                                                    setupdateForm(true)}}>Update
                                            </button>
                                        {updateForm?
                                        <Modal isOpen = {updateForm}
                                        onRequestClose = {()=>setupdateForm(false)}
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
                                        <UpdateProduct 
                                            product = {product} 
                                            setupdateForm = {setupdateForm}
                                            refetch = {refetch}
                                            setRefetch = {setRefetch}/>
                                    </Modal>:''}
                                    </div>
                                    {/* <div className="col p-2 text-white">
                                            <button 
                                                className='btn btn-danger'
                                                onClick={()=>{
                                                    deleteProduct(item._id)}}>Delete
                                            </button>
                                    </div> */}
                                    <hr style={{"height":"0.5px","borderWidth":"0","color":"white"}}></hr>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            :<h2 style={{color:'white'}}>loading....</h2>
            }
                
        </div>
    )
}

export default Home1
