import React from "react";
import "./quantity.css";

const Quantity = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="quantity">
      <span onClick={()=>onDecrease()}>-</span>
      <span>{quantity}</span>
      <span onClick={()=>onIncrease()}>+</span>
    </div>
  );
};

export default Quantity;
