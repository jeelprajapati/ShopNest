import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <span>Free shipping for standard order over ₹100</span>
        </div>
        <div className="topbarRight">
          <div className="topbarBox">
            <span>Help & FAQs</span>
          </div>
          <div className="topbarBox">
            <Link to="/account" className="link">
              <span>My Account</span>
            </Link>
          </div>
          <div className="topbarBox">INR</div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
