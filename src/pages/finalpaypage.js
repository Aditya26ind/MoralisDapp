import React from 'react';
import Header from "../components/Header";
import "./Home.css";
import { useMoralis,useMoralisWeb3Api } from 'react-moralis';
import { Suspense,useEffect, useState } from 'react';
import { useMoralisQuery } from "react-moralis";
import { Select, Button, Modal, Input } from 'antd'
import{ useLocation,Navigate} from 'react-router';
import { useNewMoralisObject } from "react-moralis";



const Paypage = () => {
    const Web3Api = useMoralisWeb3Api();
    const[address,setAddress]=useState('')  
    let{state:pay}=useLocation();
    const [redirect,setRedirect]=useState(false)
    const { save } = useNewMoralisObject("TransWay");
    const { Moralis, account,isAuthenticated } = useMoralis();

    // aborting payment

    const cancel=()=>{
        setRedirect(true)
    }

    // payment

    const handleOk = async () => {
        // Get The Price of MATIC
        const web3 = await Moralis.enableWeb3();
        const options = {
          address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          chain: "eth",
        };
        const price = await Web3Api.token.getTokenPrice(options);
        console.log(price);
        const priceMatic =  pay.price/ price.usdPrice;
        console.log(priceMatic)
        // // Send Matic to book store owenr address
        console.log(pay.name)
        console.log(pay.price)
    
        const options1 = {
          type: "native", 
          amount: Moralis.Units.ETH(priceMatic), 
          receiver: "0x5e5132540D7363d4862761B168fe220e0f51eB41"
        }
      
        const result  =  await Moralis.transfer(options1)
        
    
        //Save Transaction Details to DB
        // const Transaction = Moralis.Object.extend("Transaction");
        // const transaction = new Transaction();
    
        // transaction.set("Customer", account);
        // transaction.set("Delivery",address);
        // transaction.set("Product",pay.name );
        // transaction.save();
      
      
        if (isAuthenticated){const data = {
          name: pay.name,
          price:pay.price,
          accountval:account,
          //if seller available add dynamic receiver account
          receiver:"0x5e5132540D7363d4862761B168fe220e0f51eB41"
        };
    
        save(data, {
          onSuccess: (TransWay) => {
            // Execute any logic that should take place after the object is saved.
            alert(" Transaction Done " + TransWay.id);
          },
          onError: (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert("Failed to create new object, with error code: " + error.message);
          },
        });}
        else{
          alert("Please Login")
        }
      };

      if (redirect){
        return <Navigate to={{ pathname: '/' }}/>
      }
return(
  <>
    <Header/>
    <div className="card text-center justify-content-center" style={{width:"20rem",height:'20rem',margin:'50px',marginLeft:'35%'}}>
        <div className="card-header">
            {pay.name}
        </div>
        <div className="card-body">
            <h3 className="card-title">${pay.price}</h3>
            <h4>Delivery Address</h4>
            <Input onChange={(value) => setAddress(value)}></Input>
            <button onClick={handleOk} className="btn btn-success mt-5">Proceed</button>
            <button onClick={cancel} className="btn btn-danger mt-5 ml-5">cancel</button>
        </div>
    </div>
    </>
)
}

export default Paypage;
