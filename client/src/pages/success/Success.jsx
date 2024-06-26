import React, { useEffect, useRef } from "react";
import "./success.css";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updatePaymentStatus } from "../../actions/stripeAction";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const token=JSON.parse(localStorage.getItem("user"))?.token;
  const query=useLocation().search?.split("?")[1];
  const navigate=useNavigate();
  const flag=useRef(true);

  useEffect(()=>{
    if(flag.current){
      updatePaymentStatus(token,query,()=>{
        navigate("/");
        flag.current=false;
      })
    }
  },[navigate,token,query])

  return (
    <div className="success">
      <div className="successWrapper">
        <span className="successIcon">
          <FontAwesomeIcon icon={faBagShopping} />
        </span>
        <h3>Your payment was successful</h3>
        <span >Thank you for payment.</span>
        <button>Continue shopping</button>
      </div>
    </div>
  );
};

export default Success;
