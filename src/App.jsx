// App.js
import React, { useState, useEffect } from "react";
import fetchUserData from "./UserData.jsx";
import UserCard from "./UserCard";
import Search from "./Search";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUsers(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    if (query === "") {
      setSearchQuery("");
    }
    setSearchQuery(query);
    const filtered = users.filter((user) => {
      const matchesQuery = Object.values(user).some((value) => {
        if (Array.isArray(value)) {
          return value.some((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
        } else {
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
          );
        }
      });
      return matchesQuery;
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="app">
      <Search handleSearch={handleSearch} />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} query={searchQuery} />
        ))}
      </div>
    </div>
  );
};

export default App;
