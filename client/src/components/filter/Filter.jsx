import React, { useState } from "react";
import "./filter.css";
import { useSelector } from "react-redux";

const Filter = ({ setFilter}) => {
  const [selectedIndex, setSelectedIndex] = useState({
    sortBy: 0,
    price: 0,
  });
  const colorData = useSelector((state) => state.colors);
  const tagData = useSelector((state) => state.tags);
  const sortBy = [
    { label: "Default", value: 0 },
    { label: "Popularity", value: 1 },
    { label: "Average rating", value: 2 },
    { label: "Newness", value: 3 },
    { label: "Price:Low to High", value: 4 },
    { label: "Price:High to Low", value: 5 },
  ];

  const price = [
    { label: "All", min: 0, max: null },
    { label: "₹0 - ₹200", min: 0, max: 200 },
    { label: "₹200 - ₹300", min: 200, max: 300 },
    { label: "₹300 - ₹500", min: 300, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000+", min: 1000, max: null },
  ];

  const handlePrice = (item, index) => {
    if (item.min && item.max) {
      setFilter((filter) => ({
        ...filter,
        price: {
          min: item.min,
          max: item.max,
        },
        page:1
      }));
    } else {
      setFilter((filter) => ({
        ...filter,
        price: {
          min: item.min,
        },
        page:1
      }));
    }
    setSelectedIndex((i) => ({ ...i, price: index }));
  };

  return (
    <div className="filterContainer">
      <div className="filterCategorys">
        {/* Sort By */}
        <div className="filterCategory">
          <div className="filterTitle">
            <h4>Sort By</h4>
          </div>
          <div className="allFilters">
            {sortBy?.map((item, index) => (
              <div
                key={index}
                className={`${
                  index === selectedIndex.sortBy
                    ? "filterSelected"
                    : "filterLabel"
                }`}
                onClick={() => {
                  setFilter((filter) => ({ ...filter, sortBy: item.value,page:1 }));
                  setSelectedIndex((i) => ({ ...i, sortBy: index }));
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {/* Price */}
        <div className="filterCategory">
          <div className="filterTitle">
            <h4>Price</h4>
          </div>
          <div className="allFilters">
            {price?.map((item, index) => (
              <div
                key={index}
                className={`${
                  index === selectedIndex.price
                    ? "filterSelected"
                    : "filterLabel"
                }`}
                onClick={() => handlePrice(item, index)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {/* Colors */}
        <div className="filterCategory">
          <div className="filterTitle">
            <h4>Colors</h4>
          </div>
          <div className="allFilters">
            {colorData?.loading ? (
              <>loading</>
            ) : (
              colorData?.colors?.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index === selectedIndex?.color
                      ? "filterSelected"
                      : "filterLabel"
                  }`}
                  onClick={() => {
                    setFilter((filter) => ({ ...filter, color: item,page:1 }));
                    setSelectedIndex((i) => ({ ...i, color: index }));
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
        {/* Tags */}
        <div className="filterCategory">
          <div className="filterTitle">
            <h4>Tags</h4>
          </div>
          <div className="filterTags">
            {tagData?.loading ? (
              <div>loading</div>
            ) : (
              tagData?.tags?.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index === selectedIndex?.tag
                      ? "filterTagSelected"
                      : "filterTag"
                  }`}
                  onClick={() => {
                    setFilter((filter) => ({ ...filter, tag: item,page:1 }));
                    setSelectedIndex((i) => ({ ...i, tag: index }));
                  }}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
