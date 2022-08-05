import { Select, Button, Modal, Input } from 'antd'
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useNewMoralisObject } from "react-moralis";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'




const { Option } = Select;
function Purchase({ book }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const { Moralis, account,isAuthenticated } = useMoralis();

  

// Save To Cart
      const { save } = useNewMoralisObject("product");
      const [Total,setTotal]=useState('')
      console.log(isAuthenticated)
      const saveObject = async () => {
        if (isAuthenticated){const data = {
          name: book.name,
          price:book.price,
          image:book.image,
          total:Total,
          accountval:account
        };
    
        save(data, {
          onSuccess: (product) => {
            // Execute any logic that should take place after the object is saved.
            alert("New object created with objectId: " + product.id);
            console.log(Total)
          },
          onError: (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            console.log(Total)
            alert("Failed to create new object, with error code: " + error.message);
          },
        });}
        else{
          alert("Please Login")
        }
      };
      const handleSelect=(e)=>{
        console.log(e);
        setTotal(e)
      }
    
  return (
    <>
    <p className='nameofItem' style={{fontSize:'15px'}}>{book.name}</p>
      <span className="price" style={{marginTop:'-50px'}}> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      <h3>Quantity</h3>
      <Select name='total' onSelect={handleSelect} defaultValue="1" style={{ width: "100%" }}>
        <Option value={"1"}>1</Option>
        <Option value={"2"}>2</Option>
        <Option value={"3"}>3</Option>
        <Option value={"4"}>4</Option>
        <Option value={"5"}>5</Option>
      </Select>
      
      {/* <Button
        className="login"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={() => setIsModalVisible(true)}
      >
        <ShoppingCartOutlined />Buy NOw
      </Button> */}
      <Button onClick={saveObject} className="addto" style={{width:'100%',backgroundColor:"#013220",marginTop:'10px',color:"white"}}>
        Add To cart
      </Button>
    </>
  )
}

export default Purchase;
