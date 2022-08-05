import { useMoralis } from 'react-moralis';
import { Suspense,useEffect, useState } from 'react';
import { useMoralisQuery } from "react-moralis";
import { Select, Button, Modal, Input } from 'antd'
import {Link} from "react-router-dom"

export default function Cart() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const {Moralis, account, chainId} = useMoralis();
  const [currdata,setCurrdata]=useState({price:'',name:'',image:""})
    
  //  Particular user data fetching

  const { data, error, isLoading } = useMoralisQuery("product", query =>
  query
    .equalTo("accountval", account),)

  const all=JSON.stringify(data,null,2)
  const finalResult = JSON.parse(all)
  

if (error) {
  return <span>🤯</span>;
}

if (isLoading) {
  return <p className='text-center text-uppercase mt-5 fs-1'>....Loading....</p>;
}
return (<>
<div className='row'>
  {finalResult.map((e, i) => {
                return (
                  <div className='col-lg-4 col-sm-12 col-md-6 mb-md-2'>
                  <div className="card  mt-4 ms-5 mx-5 " style={{width: "18rem",height: "100%" ,overflow: "hidden"}}>
              
                    <img  src={e.image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <p  className="font-weight-bold">{e.name}</p>
                      <p   className="card-text">${e.price}</p>
                      <p  className="card-text font-italic">Total Item:{e.total}</p>
                      <button className="btn btn-success"><Link to='/final' state={e}>BUY</Link></button>
                      </div>
                    </div>
                  </div>
                );
            })}
            ;
            </div>
            
                </>)
}