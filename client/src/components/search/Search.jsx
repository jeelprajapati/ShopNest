import React, { useEffect, useState } from "react";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";
import { getProductBySearch } from "../../actions/productActions";

const Search = ({ searchPage, selectedIndex, setSearchPage, dispatch }) => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);

  useEffect(() => {
    setSearchPage(1);
  }, [value, setSearchPage]);

  useEffect(() => {
    if (selectedIndex) {
      dispatch(
        getProductBySearch({ search: value, page: searchPage, pageSize: 8 })
      );
    }
  }, [value, selectedIndex, dispatch, searchPage]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="searchbarContainer">
      <div className="searchIcon">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <input type="text" placeholder="Search" value={search} onChange={handleChange} />
    </div>
  );
};

export default Search;
