// Search.js - Search input component
import React from "react";

const Search = ({ handleSearch, inputRef, handleKeyDown }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
