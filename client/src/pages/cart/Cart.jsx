import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import Quantity from "../../components/quantity/Quantity.jsx";
import { CartContext } from "../../context/CartContext.js";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeToken } from "../../actions/stripeAction.js";
import { Link } from "react-router-dom";

const Cart = () => {
  const key = process.env.REACT_APP_STRIPE_KEY;
  const { state, addToCart, removeFromCart, resetCart } =
    useContext(CartContext);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handlePayment = async () => {
    const stripe = await loadStripe(key);

    getStripeToken(token, state, (sessionId) => {
      stripe.redirectToCheckout({
        sessionId,
      });
      resetCart();
    });
  };

  return (
    <div className="cart">
      <Topbar />
      <div className="cartWrapper">
        <div className="cartNavbar">
          <Navbar id={2} />
        </div>
        <div className="cartContainer">
          <div className="cartProductTable">
            <table>
              <thead>
                <tr>
                  <th align="start" colSpan={2}>
                    PRODUCT
                  </th>
                  <th align="start">PRICE</th>
                  <th align="end">QUANTITY</th>
                  <th align="start">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {state?.products?.map((item) => (
                  <tr key={item._id}>
                    <td align="start" colSpan={2}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <img src={item?.image} alt="" />
                        <span>{item?.item}</span>
                      </div>
                    </td>
                    <td>₹ {item.price?.toFixed(2)}</td>
                    <td>
                      <Quantity
                        quantity={item.quantity}
                        onIncrease={() => {
                          addToCart({
                            ...item,
                            quantity: 1,
                            total: item.price,
                          });
                        }}
                        onDecrease={() => {
                          if (item.quantity === 1) {
                            removeFromCart({
                              _id: item._id,
                              total: item.price,
                            });
                          } else {
                            addToCart({
                              ...item,
                              quantity: -1,
                              total: -item.price,
                            });
                          }
                        }}
                      />
                    </td>
                    <td>₹ {item.total?.toFixed(2)}</td>
                  </tr>
                ))}
                {state?.products?.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      align="center"
                      style={{
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "gray",
                      }}
                    >
                      No Item Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="cartTotalContainer">
            <div className="cartTotal">
              <h3>CART TOTALS</h3>
              <div className="totalBox" style={{ fontWeight: "600" }}>
                <span>Subtotal</span>
                <span>₹ {state?.total?.toFixed(2)}</span>
              </div>
              <div className="totalBox">
                <span>External Shipping</span>
                <span>₹ 0.00</span>
              </div>
              <div className="totalBox">
                <span>Shipping Discount</span>
                <span>₹ 0.00</span>
              </div>
              <div
                className="totalBox"
                style={{ fontWeight: "600", border: "none" }}
              >
                <span>Total</span>
                <span>₹ {state?.total?.toFixed(2)}</span>
              </div>

              <div className="stripe">
                {token ? (
                  <button
                    onClick={handlePayment}
                    disabled={state?.products?.length === 0}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                ) : (
                  <Link to={"/login"} className="link">
                    <button>PROCEED TO CHECKOUT</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
