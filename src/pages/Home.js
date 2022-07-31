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


const carousel=[ Carousel1,Carousel2,Carousel3 ];
const catCard=[Adventure,Fantasy,Dictionaries];
const Home = () => {

return(
  <>
  <div className="container">
    <Header/>
    <Carousel autoplay className="carousel">
      {carousel.map((e)=> {
        return <img src={e} className="carousel-img" alt="carousel"></img>;
      })}

    </Carousel>
    <div className="cards">
      <Card className="card">
        <h1>Browse </h1>
        <img src={Comics} alt="Comics Category" className="card-content"></img>
        <br/>
        < Link to="/categories" state={"Comics"} className="link">
          SHop NOW
        </Link>
      </Card>
      <Card className="card">
        <h1>LAND</h1>
        <img src={LAND} alt="Artemis Fowl" className="card-content"></img>
        <br/>
        < Link to="/categories"  className="link">
        view product
        </Link>
      </Card>
      <Card className="card">
        <h1> TREES </h1>
        <img src={ TREES } alt=" Moby Dick " className="card-content"></img>
        <br/>
        < Link to="/categories" className="link">
         view product
        </Link>
      </Card>
      <Card className="card">
       <h1> Category</h1>
       <div className="card-content">
        {catCard.map((e) =>{
          return (
            <img
            src={e}
            alt="category"
            className="card-category"
            onClick={() => console.log("beauty")}></img>
          );
        })}
        <br/>
        <Link to="/" className="link">
          ALL
        </Link>
       </div>
      </Card>
    </div>

    
  </div>
  </>
)
}

export default Home;
