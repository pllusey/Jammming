import React, {useState} from 'react';
import styles from './SearchBar.module.css'

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

    const tracks = [
        {
            name: 'song 1',
            artist: 'artist 1'
        }
    ]

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    return (
        <>
        <input 
            className={styles.searchbar}
            type="search"
            placeholder='search'
            onChange={handleChange}
            value={searchInput}
        />
        </>
    )
}

export default SearchBar;