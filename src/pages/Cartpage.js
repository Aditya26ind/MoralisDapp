import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";
import { Carousel,Card } from 'antd';

import Carousel1 from "../images/carousel1.png";
import Carousel2 from "../images/carousel2.png";
import Carousel3 from "../images/carousel3.png";
import Comics from "../images/comics.png";
import LAND from "../images/land.png";
import TREES from "../images/trees.png";
import Adventure from"../images/rivercleaning.png";
import Dictionaries from "../images/plant.png";
import Fantasy from "../images/foodsafety.png";
import Cart from '../components/Cart';


const carousel=[ Carousel1,Carousel2,Carousel3 ];
const catCard=[Adventure,Fantasy,Dictionaries];
const CartPage = () => {

return(
  <>
    <Header/>
    <Cart/>
  </>
)
}

export default CartPage;
