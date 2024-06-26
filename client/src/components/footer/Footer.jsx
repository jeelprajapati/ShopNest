import React, { useEffect } from "react";
import "./footer.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../actions/standardActions";

const Footer = () => {
  const catData = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="footerWrapper">
          <h4>Category</h4>
          <div className="footerCategory">
            {catData?.categories?.map((item) =>
              item.name === "Accessories" ? (
                item?.subCategory?.map((i) => <span>{i}</span>)
              ) : (
                <span>{item?.name}</span>
              )
            )}
          </div>
        </div>
        <div className="footerWrapper">
          <h4>HELP</h4>
          <div className="footerCategory">
            <span>Track Order</span>
            <span>Return</span>
            <span>Shipping</span>
            <span>FAQs</span>
          </div>
        </div>
        <div className="footerContact">
          <h4>GET IN TOUCH</h4>
          <span className="footerText">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
            itaque rem blanditiis quibusdam. Sint ullam earum corporis
            tempora.Voluptatum aliquam qui veritatis id illum. Beatae
            dignissimos commodi similique.
          </span>
        </div>
        <div className="newSletter">
          <h4>NEW SLETTER</h4>
          <div className="footerEmail">
            <input type="text" placeholder="email@example.com" />
          </div>
          <div className="subscribeBtn">
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
