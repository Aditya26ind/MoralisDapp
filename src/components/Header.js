import { PageHeader, Button,Input,Space,Badge } from 'antd';
import { useMoralis } from "react-moralis";
import { Link ,Redirect} from 'react-router-dom';
import CartPage from '../pages/Cartpage';
import './Header.css'
import Amazon from "../images/logo.png";
import USA from "../images/usa.png";
import BookStore from "../images/bookstore.png";
import{ShoppingCartOutlined,MenuOutlined} from "@ant-design/icons";
import Product from '../pages/Product';
import {Navigate} from "react-router-dom";
import { useState } from 'react';

const {Search } = Input;
const categories=["Land","Trees","Plants","River","foodsafety"]; 

const Header = () => {
const { authenticate,account,isAuthenticated,logout} = useMoralis();
const [redirect,setRedirect]=useState(false)
const auth=()=>{
  if(!isAuthenticated){
    authenticate()
  }
  else{
    logout();
    setRedirect(true)
}
}
if (redirect){
  return <Navigate to={{ pathname: '/' }}/>
}
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
            <img src={Amazon} className="logo"></img>
            <img src={BookStore} className="logo"></img>
            <Search
            placeholder="Find A Product"
            enterButton
            className="searchBar"
            />
            <Button
             className="login"
             key="1" 
             type="primary" onClick={auth}>
         {isAuthenticated ? <span>logout</span>: <span>login</span>}
            </Button>
            <Space size={"large"}>

              {/* <Badge count={0} showZero> */}
              <span className="header-buttons">
                 <ShoppingCartOutlined className="header-icon"/>
                 {isAuthenticated ? <Link to='/Cartpage'>Cart</Link>: <span className='text-danger'>login First</span>}
              </span>
              {/* </Badge> */}
              <Space className="header-buttons" size={"small"}>
                <img src={USA} alt="region" className="flag"></img>
              </Space>
            </Space>
          </>
        ]}>
      </PageHeader>
      <div className="site-page-subheader-ghost-wrapper">
        <Space size={"middle"}>
          <Space size={"small"} style={{fontWeight:"bold"}}>
             <MenuOutlined/>
             Categories 
          </Space>
          {categories.map((e) =>{
            return(
              <Link to="/categories" state={e} className="categories">
                {e}
              </Link>
            )
          })}
        </Space>
      </div>
    </div>
  )
}
export default Header;