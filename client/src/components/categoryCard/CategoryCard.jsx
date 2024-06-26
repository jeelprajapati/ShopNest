import React from "react";
import "./categoryCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryCard = () => {
  const catData = useSelector((state) => state.categories);

  return (
    <div className="categoryCardContainer">
      <div className="categoryCards">
        {catData?.loading ? (
          <div>loading</div>
        ) : (
          catData?.categories.map((item, index) => (
            <div key={item._id} className="categoryCard">
              <div className="categoryWrapper">
                <img src={item.image} alt="" />
                <div className="cardWrapper">
                  <h4>{item.name}</h4>
                  <span>Spring 2024</span>
                </div>
                <Link
                  to={`/products?id=${index + 1}`}
                  className="link cardContainer"
                ></Link>
                <button>Show Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
