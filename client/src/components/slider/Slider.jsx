import React from "react";
import "./slider.css";
import { motion } from "framer-motion";

const slider = ({ item }) => {
  return (
    <div className="sliderContainer">
      <div className="slides">
        <div className="sliderContent">
          <span>{item.label}</span>
          <h2>{item.title}</h2>
          <button>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default slider;
