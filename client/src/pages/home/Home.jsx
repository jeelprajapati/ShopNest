import React, { useEffect, useState } from "react";
import "./home.css";
import Wrapper from "../../components/wrapper/Wrapper.jsx";
import CategoryCard from "../../components/categoryCard/CategoryCard.jsx";
import Shop from "../../components/shop/Shop.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";

const Home = () => {
  const [change,setChange]=useState(0);
  return (
    <div className="homeContainer">
      <div className="wrapper">
        <Topbar />
        <div className="mainContainer">
          <Wrapper change={change} />
        </div>
      </div>
      <CategoryCard />
      <div className="productContainer">
        <h3>PRODUCT OVERVIEW</h3>
        <Shop setChange={setChange}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
