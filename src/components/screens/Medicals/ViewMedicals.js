import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewMedicals = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        fetch('https://arush-enterprises-api.adaptable.app/allmedicals',{
            method:"get",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("arushenterpricesjwt")
                }
        })
        .then(res =>res.json())
        .then(result => {
            setData(result)
            setLoading(true)
        })
    },[])
    const fetchByMedicalName = (medicalname) =>{
        fetch("https://arush-enterprises-api.adaptable.app/searchbymedicalname",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("arushenterpricesjwt")
            },
            body:JSON.stringify({
                medicalname
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
    return (
        <div style={{background:"#0d2630"}}>
            <div style={{'background':'white',width:'80%',margin:'15px auto', 'border':'solid','borderRadius':'10px','paddingLeft':'10px', 'paddingRight':'10px','height':'50px'}}>
                <input type='text' placeholder = 'Search' onChange={(e)=>fetchByMedicalName(e.target.value)}></input>
            </div>
            {loading && data.length ?
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col p-3 bg-primary text-white">Medical Name</div>
                    <div className="col p-3 bg-dark text-white">Contact</div>
                    <div className="col p-3 bg-primary text-white">Address</div>
                {
                    data.map(item=>{
                        return(
                            <Link 
                                className="container mt-1" 
                                key={item._id}
                                to={`/viewmedical/${item._id}`}>
                                <div style={{margin:"0"}} className="row">
                                    <div className="col p-2 text-white">{item.medical_name}</div>
                                    <div className="col p-2 text-white">{item.contact}</div>
                                    <div className="col p-2 text-white">{item.address}</div>
                                    <hr style={{"height":"0.5px","borderWidth":"0","color":"white"}}></hr>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
            :<h2>loading....</h2>
            }
                
        </div>
    )
}

export default ViewMedicals
