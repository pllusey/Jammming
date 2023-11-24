import React, { useState, useCallback } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const handleChange = useCallback((e) => {
    e.preventDefault();
    setTerm(e.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Find a song..."
        onChange={handleChange}
        value={term}
      />
      <button className={styles.searchButton} onClick={search}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
