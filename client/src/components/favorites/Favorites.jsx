import React from "react";
import "./favorites.css";
import ProductCard from "../productCard/ProductCard.jsx";
import { useSelector } from "react-redux";

const Favorites = ({setChange}) => {
  const { loading, favorites } = useSelector((state) => state.favorites);
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      <div className="favoritesContainer">
        {loading ? (
          <div>Loading</div>
        ) : favorites.length === 0 ? (
          <div>No Item Yet</div>
        ) : (
          favorites.map((item) => <ProductCard key={item.id} item={item} setChange={setChange} />)
        )}
      </div>
    </div>
  );
};

export default Favorites;
