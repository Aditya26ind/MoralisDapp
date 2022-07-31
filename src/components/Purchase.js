import { Select, Button, Modal, Input } from 'antd'
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useNewMoralisObject } from "react-moralis";




const { Option } = Select;
function Purchase({ book }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const { Moralis, account } = useMoralis();


  const handleOK = async () => {
    //Get The Price of MATIC
    const options = {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      chain: "eth",

    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic = book.price / price.usdPrice;

//Send  Matic to book store owner address

const options1={
    type:"native",
    amount:Moralis.Units.ETH(priceMatic),
    receiver:"0xF7a4f44e5D4b15599C2EC35cC7E6A62ce96a1bE3"
}
let result =await Moralis.transfer(options1)
  };


// Save Transaction Details to DB
const Monster= Moralis.Object.extend("Monster");
const monster = new Monster();

monster.set("Customer",account);
monster.set("Delivery",delivery);
monster.set("Product",book.name);
monster.save()
      const { save } = useNewMoralisObject("product");
    
      const saveObject = async () => {
        const data = {
          name: book.name,
          price:book.price,
          image:book.image,
          // quantitites:book.quantity,
        };
    
        save(data, {
          onSuccess: (product) => {
            // Execute any logic that should take place after the object is saved.
            alert("New object created with objectId: " + product.id);
          },
          onError: (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert("Failed to create new object, with error code: " + error.message);
          },
        });
      };
    
  return (
    <>
    <p className='nameofItem' style={{fontSize:'15px'}}>{book.name}</p>
      <span className="price" style={{marginTop:'-50px'}}> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      <h3>Quantity</h3>
      <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select>
      <Button
        className="login"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={() => setIsModalVisible(true)}
      >
        <ShoppingCartOutlined />Buy NOw
      </Button>
      <Button onClick={saveObject} className="addto" style={{width:'100%',backgroundColor:"#013220",marginTop:'10px',color:"white"}}>
        Add To cart
      </Button>
      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOK}
        onCancel={() => setIsModalVisible(false)}>

        <div style={{ display: "fixed" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${book.price}</h2>
            <h4>Delivery Address</h4>
            <Input onchange={(value) => setDelivery(value)}></Input>
          </div>
        </div>
      </Modal>

    </>
  )
}

export default Purchase;
