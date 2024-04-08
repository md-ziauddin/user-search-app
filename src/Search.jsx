// Search.js
import React from "react";

const Search = ({ handleSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
