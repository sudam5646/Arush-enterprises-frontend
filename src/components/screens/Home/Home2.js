import React, {useState, useEffect} from 'react'
import './Home.css'

const Home2 = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
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
    },[])
    return (
        <div style={{background:"#9785e6",'overflowX':'auto',marginTop:'10px'}}>
            {loading && data.length ?
            <>
            <table style={{'minWidth':'400px','maxWidth':'800px','margin':'auto','background':"#0d2630"}}>
                <tr style={{'backgroundColor':'#42218f','lineHeight':'3px','textAlign':'center'}}>
                    <th className="p-3 text-white" rowSpan='2'>Product Name</th>
                    <th className="p-3 text-white" colSpan='2'>Quantities</th>
                </tr>
                <tr style={{'backgroundColor':'#42218f','lineHeight':'3px','textAlign':'center'}}>
                </tr>
                {data.map(item=>{
                        return(
                            <tr key={item._id}>
                                <td className="p-3 text-white">{item.product_name}</td>
                                <td className="p-3 text-white center">{item.quantities}</td>
                            </tr>
                        )})}
            </table>
            {/* <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-5 p-3 bg-primary text-white">Product Name</div>
                    <div className="col-4 p-3 bg-dark text-white">Quantities</div>
                    <div className="col-3 p-3 bg-primary text-white">Amount</div>
                {
                    data.map(item=>{
                        return(
                            <div className="container-fluid mt-3" key={item._id}>
                                <div className="row">
                                    <div className="col-5 p-3 bg-secondary text-white">{item.product_name}</div>
                                    <div style={{'textAlign':'center'}} className="col-2 p-2 bg-secondary text-white">{item.quantities}</div>
                                    <div style={{'textAlign':'center'}}  className="col-2 p-2 bg-secondary text-white">{item.quantities}</div>
                                    <div style={{'textAlign':'center'}}  className="col-3 p-3 bg-secondary text-white">{item.amount} ₹</div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div> */}
            </>
            
            :<h2 style={{color:'white'}}>loading....</h2>
            }
        </div>
    )
}

export default Home2
