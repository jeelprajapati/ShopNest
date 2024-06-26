import React, { useEffect, useState } from "react";
import "./productCard.css";
import like from "../../assets/image/like.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addInFavorite } from "../../actions/productActions";

const ProductCard = ({ item, setChange }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(() => {
      if (item?.favorite?.includes(user?.userId)) {
        return true;
      } else {
        return false;
      }
    });
  }, [user?.userId, item?.favorite]);

  const handleFavorite = () => {
    addInFavorite(item?._id, user?.token, () => {
      setChange((change) => !change);
    });
    setFavorite((favorite) => !favorite);
  };

  const varients = {
    animate: {
      scale: 1.1,
      objectFit: "cover",
    },
    transition: {
      ease: "ease",
      duration: 0.9,
    },
  };

  const buttonVarient = {
    initial: {
      display: "none",
      y: "40px",
    },
    buttonAnimation: {
      display: "block",
      y: 0,
    },
    buttonTransition: {
      ease: "ease",
      duration: 0.9,
    },
  };

  return (
    <div className="productCard">
      <motion.div
        initial="initial"
        whileHover={["buttonAnimation", "animate"]}
        className="productImgWrapper"
      >
        <motion.img
          variants={varients}
          className="productImg"
          transition="transition"
          src={item.image}
          alt=""
        />
        <Link to={`/products/${item._id}`}>
          <motion.button
            variants={buttonVarient}
            transition="buttonTransition"
            className="showProduct"
          >
            Quick View
          </motion.button>
        </Link>
      </motion.div>
      <div className="productDetail">
        <div className="productWrapper">
          <span className="productName">{item.item}</span>
          {favorite ? (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#6c7ae0", cursor: "pointer" }}
              onClick={handleFavorite}
            />
          ) : (
            <img
              src={like}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={handleFavorite}
            />
          )}
        </div>
        <div className="productPrice">₹ {item.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
