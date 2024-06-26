import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import like from "../../assets/image/like.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext.js";
import { getFavorite } from "../../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR } from "../../assets/constants/productConstants.js";
import toast from "react-hot-toast";

const Navbar = ({ id, change = 0 }) => {
  const [active, setActive] = useState(0);
  const { state } = useContext(CartContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const { loading, favorites, error } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFavorite(token));
    }
  }, [dispatch, token, change]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [dispatch, error]);

  const isActive = () => {
    setActive(window.scrollY);
  };

  useEffect(() => {
    setActive(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    setTotalProducts(state.products.length);
  }, [state]);

  return (
    <div
      className={`navbar ${active > 39 && "active"}`}
      style={{ top: `${active < 45 ? `calc(40px - ${active}px)` : "0"} ` }}
    >
      <div className="navbarWrapper">
        <div className="logoContainer">
          <div>
            <Link to="/" className="link logo">
              <span>SHOP</span>
              <span>NEST</span>
            </Link>
          </div>
        </div>
        <div className="navbarListCenter">
          <div className={`listItem ${id === 1 && "listItemSelected"}`}>
            <Link to="/" className="link">
              Home
            </Link>
          </div>
          <div className={`listItem  ${id === 2 && "listItemSelected"}`}>
            <Link to="/products" className="link">
              Products
            </Link>
          </div>
          <div className="listItem">About</div>
          <div className={`listItem ${id === 4 && "listItemSelected"}`}>
            <Link to="/contact" className="link">
              Contact
            </Link>
          </div>
        </div>
        <div className="navbarListLeft">
          <div className="navbarIcon">
            <Link to={"/cart"} className="link">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ fontSize: "20px" }}
              />
            </Link>
            <div className="batch">
              <span>{totalProducts}</span>
            </div>
          </div>
          <div className="navbarIcon">
            <Link to="/account?id=2">
              <img src={like} alt="" style={{ cursor: "pointer" }} />
            </Link>
            <div className="batch">
              <span>{!loading && favorites?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
