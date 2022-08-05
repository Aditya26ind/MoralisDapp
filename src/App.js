import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from './pages/Product';
import Categories from './pages/Categories';
import CartPage from './pages/Cartpage';
import { useMoralis,account } from "react-moralis";
import './App.css';
import Paypage from './pages/finalpaypage';

const App = ({account}) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route exact path="product" element={<Product />} />
    <Route exact path="categories" element={<Categories />} />
    <Route exact path='Cartpage' element={<CartPage/>}/>
    <Route exact path='final' element={<Paypage/>}/>
    
  </Routes>
);

export default App;
