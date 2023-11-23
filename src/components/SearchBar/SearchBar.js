import React, { useState, useCallback } from "react";
import "./SearchBar.module.css";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = useCallback((e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(searchInput);
  }, [props.onSearch, searchInput]);

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Find a song..."
        onChange={handleChange}
        value={searchInput}
      />
      <button type="submit" className="SearchButton">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
