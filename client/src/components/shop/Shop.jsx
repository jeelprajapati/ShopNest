import React, { useEffect, useState } from "react";
import "./shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpShortWide,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Filter from "../filter/Filter";
import ProductCard from "../productCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColors, getTags } from "../../actions/standardActions.js";
import { getProducts } from "../../actions/productActions.js";
import Search from "../search/Search.jsx";

const Shop = ({ id = 0, setChange }) => {
  const catData = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  const [selectedIndex, setSelectedIndex] = useState({
    index: -1,
    subIndex: -1,
  });
  const [searchPage, setSearchPage] = useState(1);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [url, setUrl] = useState("/product");
  const [filter, setFilter] = useState({
    sortBy: 0,
    price: {
      min: 0,
    },
    color: "",
    tag: "",
    page: 1,
    pageSize: 8,
  });

  useEffect(() => {
    dispatch(getColors());
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts(url, filter));
  }, [
    dispatch,
    filter,
    filter?.sortBy,
    filter?.price,
    filter?.color,
    filter?.tag,
    filter?.page,
    filter?.pageSize,
    url,
  ]);

  useEffect(() => {
    setCategoryIndex(id);
  }, [id]);

  return (
    <>
      <div className="shopContainer">
        <div className="shopTopbar">
          <div className="shopCategory">
            <Link
              to="/products"
              className={`${
                categoryIndex.index === -1 && categoryIndex.subIndex === -1
                  ? "shopCategorySelected"
                  : "shopCategoryItem"
              } link`}
            >
              All Products
            </Link>
            {catData.loading ? (
              <></>
            ) : (
              catData?.categories?.map((item, index) =>
                item.name === "Accessories" ? (
                  item?.subCategory?.map((i) => (
                    <span
                      key={i}
                      className={`${
                        categoryIndex.index === index &&
                        categoryIndex.subIndex === i
                          ? "shopCategorySelected"
                          : "shopCategoryItem"
                      }`}
                      onClick={() => {
                        setCategoryIndex({ index, subIndex: i });
                        setUrl(
                          `/product?category=${item?.name}&subCategory=${i}`
                        );
                        setFilter((filter) => ({
                          ...filter,
                          page: 1,
                        }));
                      }}
                    >
                      {i}
                    </span>
                  ))
                ) : (
                  <span
                    key={item?.name}
                    className={`${
                      index === categoryIndex.index
                        ? "shopCategorySelected"
                        : "shopCategoryItem"
                    }`}
                    onClick={() => {
                      setCategoryIndex({ index, subIndex: 0 });
                      setUrl(`/product?category=${item?.name}`);
                      setFilter((filter) => ({
                        ...filter,
                        page: 1,
                      }));
                    }}
                  >
                    {item.name}
                  </span>
                )
              )
            )}
          </div>
          <div className="shopRight">
            <div
              className={`${
                selectedIndex === 1 ? "shopBoxSelected" : "shopBox"
              }`}
              onClick={() =>
                selectedIndex === 1 ? setSelectedIndex(0) : setSelectedIndex(1)
              }
            >
              <div className="shopIcon">
                <FontAwesomeIcon
                  icon={selectedIndex === 1 ? faXmark : faArrowUpShortWide}
                />
              </div>
              <div className="shopLabel">Filter</div>
              {selectedIndex === 1 && <div className="shopArrow"></div>}
            </div>
            <div
              className={`${
                selectedIndex === 2 ? "shopBoxSelected" : "shopBox"
              }`}
              onClick={() =>
                selectedIndex === 2 ? setSelectedIndex(0) : setSelectedIndex(2)
              }
            >
              <div className="shopIcon">
                <FontAwesomeIcon
                  icon={selectedIndex === 2 ? faXmark : faMagnifyingGlass}
                />
              </div>
              <div className="shopLabel">Search</div>
              {selectedIndex === 2 && <div className="shopArrow"></div>}
            </div>
          </div>
        </div>
        {selectedIndex === 1 && (
          <div className="filters">
            <Filter setFilter={setFilter} />
          </div>
        )}
        {selectedIndex === 2 && (
          <div className="searchbar">
            <Search
              searchPage={searchPage}
              selectedIndex={selectedIndex}
              setSearchPage={setSearchPage}
              dispatch={dispatch}
            />
          </div>
        )}
        <div className="products">
          {products?.map((item) => (
            <ProductCard key={item.id} item={item} setChange={setChange} />
          ))}
        </div>
        <div className="loadingBtn">
          <button
            disabled={products?.length !== filter?.page * filter?.pageSize}
            onClick={() => {
              selectedIndex === 2
                ? setSearchPage((prev) => prev + 1)
                : setFilter((filter) => ({ ...filter, page: filter.page + 1 }));
            }}
          >
            {loading ? "Loading" : "Load More"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
