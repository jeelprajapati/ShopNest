import React, { useEffect, useContext, useRef, useState } from "react";
import "./singleProduct.css";
import Topbar from "../../components/topbar/Topbar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import Quantity from "../../components/quantity/Quantity";
import { CartContext } from "../../context/CartContext.js";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../actions/productActions.js";
import toast from "react-hot-toast";
import { CLEAR_ERROR } from "../../assets/constants/productConstants.js";

const SingleProduct = () => {
  const id = useLocation().pathname.split("/")[2];
  const [open, setOpen] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const ref = useRef();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const dispatch = useDispatch();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);

  const handleDispatch = () => {
    const { item, image, price, _id,...other } = product;
    addToCart({
      _id,
      item,
      image,
      price,
      quantity,
      total: price * quantity,
    });
    toast.success("Product added to cart successfully.")
  };

  return (
    <div className="singleProduct">
      <Topbar />
      <div className="singleProductNav">
        <Navbar id={2} />
      </div>
      {loading ? (
        <div className="singleProductContainer">Loading</div>
      ) : (
        <div className="singleProductContainer">
          <div className="singleProductImg">
            <div className="imgSlider">
              <img src={product?.image} alt="" />
            </div>
            <div className="singleProductMainImg">
              <img src={product?.image} alt="" />
            </div>
          </div>
          <div className="singleProductDetail">
            <h4>{product?.item}</h4>
            <span className="singleProductPrice">₹ {product?.price}</span>
            <p className="singleProductDesc">{product?.description}</p>
            <div className="singleProductBoxWrapper">
              <div className="singleProductBox">
                <div className="singleProductLabel">Size</div>
                <div
                  className="singleProductBorder"
                  ref={ref}
                  onClick={() => {
                    open === 0 ? setOpen(1) : setOpen(0);
                  }}
                >
                  <div className="singleProductSelect">
                    {size === "" ? "Choose an option" : `Size ${size}`}
                  </div>
                  <div className="singleProductIcon">
                    <div className="selectArrow"></div>
                  </div>
                  {open === 1 && (
                    <div className="dropdown" ref={ref}>
                      <ul>
                        <li
                          className={size === "" ? "selectedLi" : ""}
                          onClick={() => setSize("")}
                        >
                          Choose an option
                        </li>
                        {product?.size?.map((i, index) => (
                          <li
                            key={index}
                            className={size === i ? "selectedLi" : ""}
                            onClick={() => {
                              setSize(i);
                            }}
                          >
                            Size {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="singleProductBox">
                <div className="singleProductLabel">Color</div>
                <div
                  className="singleProductBorder"
                  ref={ref}
                  onClick={() => {
                    open === 0 ? setOpen(2) : setOpen(0);
                  }}
                >
                  <div className="singleProductSelect">
                    {color === "" ? "Choose an option" : color}
                  </div>
                  <div className="singleProductIcon">
                    <div className="selectArrow"></div>
                  </div>
                  {open === 2 && (
                    <div className="dropdown" ref={ref}>
                      <ul>
                        <li
                          className={color === "" ? "selectedLi" : ""}
                          onClick={() => setColor("")}
                        >
                          Choose an option
                        </li>
                        {product?.color?.map((i, index) => (
                          <li
                            key={index}
                            className={color === i ? "selectedLi" : ""}
                            onClick={() => setColor(i)}
                          >
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="singleProductQty">
              <Quantity
                quantity={quantity}
                onDecrease={() => {
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
                }}
                onIncrease={() => {
                  setQuantity((prev) => prev + 1);
                }}
              />
            </div>
            <div className="cartBtn">
              <button onClick={handleDispatch}>ADD TO CART</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
