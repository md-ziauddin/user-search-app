// App.js
import React, { useState, useEffect } from "react";
import fetchUserData from "./UserData";
import UserCard from "./UserCard";
import Search from "./Search";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUsers(userData);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) => {
    // Iterate over each property value of the current user object
    return Object.values(user).some((value) => {
      // Check if the property value is an array
      if (Array.isArray(value)) {
        // If it's an array, check if any item in the array includes the search query
        return value.some((item) =>
          // Perform case-insensitive search by converting both item and searchQuery to lowercase
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        // If it's not an array, check if it's a string and if it includes the search query
        return (
          typeof value === "string" &&
          // Perform case-insensitive search by converting both value and searchQuery to lowercase
          value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });
  });

  return (
    <div className="app">
      <Search handleSearch={handleSearch} />
      {searchQuery && (
        <div className="user-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} query={searchQuery} />
            ))
          ) : (
            <div className="user-card no-user-found">
              <p>No user found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
