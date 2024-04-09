// App.js
import React, { useState, useEffect, useRef } from "react";
import fetchUserData from "./UserData";
import UserCard from "./UserCard";
import Search from "./Search";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUsers(userData);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setHighlightedIndex(-1);
    if (query && listRef.current) {
      listRef.current.focus();
    } else {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    return Object.values(user).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });
  });

  useEffect(() => {
    if (highlightedIndex !== -1 && listRef.current) {
      listRef.current.children[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      listRef.current.children[highlightedIndex]?.focus();
    }
  }, [highlightedIndex]);

  return (
    <div className="app">
      <Search
        handleSearch={handleSearch}
        inputRef={searchInputRef}
        handleKeyDown={handleKeyDown}
      />
      {searchQuery && (
        <div className="user-list" onKeyDown={handleKeyDown} ref={listRef}>
          {filteredUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              query={searchQuery}
              isHighlighted={index === highlightedIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
