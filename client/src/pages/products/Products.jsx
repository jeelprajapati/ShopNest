import React, { useEffect, useState } from "react";
import "./products.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import Shop from "../../components/shop/Shop.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [change,setChange]=useState(0);
  const search=useLocation().search;

  const id=search.split("=")[1];
  return (
    <div className="productsPage">
      <Topbar />
      <div className="productPageWrapper">
        <div className="productPageNavbar">
          <Navbar id={2} change={change}/>
        </div>
        <div className="productPageShop">
          <Shop id={id} setChange={setChange}/>
        </div>
        <div className="productPageFooter">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Products;
