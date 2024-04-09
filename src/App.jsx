// App.js - Main application component responsible for rendering the search input and user list
import React, { useEffect, useReducer, useRef } from "react";
import fetchUserData from "./UserData";
import UserCard from "./UserCard";
import Search from "./Search";

// Initial state of the application
const initialState = {
  users: [], // Array to store user data
  searchQuery: "", // String to store the search query
  highlightedIndex: -1, // Index of the currently highlighted user card
  navigationSource: "keyboard", // Source of navigation (keyboard or mouse)
};

// Reducer function to handle state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload }; // Update users array
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }; // Update search query
    case "SET_HIGHLIGHTED_INDEX":
      return { ...state, highlightedIndex: action.payload }; // Update highlighted index
    case "SET_NAVIGATION_SOURCE":
      return { ...state, navigationSource: action.payload }; // Update navigation source
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const listRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      dispatch({ type: "SET_USERS", payload: userData });
    };
    fetchData();
  }, []);

  // Handlers for search, keyboard navigation, and mouse events
  const handleSearch = (query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
    dispatch({ type: "SET_HIGHLIGHTED_INDEX", payload: -1 });
    if (query && listRef.current) {
      listRef.current.focus();
    } else {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      dispatch({
        type: "SET_HIGHLIGHTED_INDEX",
        payload: Math.min(state.highlightedIndex + 1, filteredUsers.length - 1),
      });
      dispatch({ type: "SET_NAVIGATION_SOURCE", payload: "keyboard" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      dispatch({
        type: "SET_HIGHLIGHTED_INDEX",
        payload: Math.max(state.highlightedIndex - 1, 0),
      });
      dispatch({ type: "SET_NAVIGATION_SOURCE", payload: "keyboard" });
    }
  };

  const handleMouseEnter = (index) => {
    if (state.navigationSource === "mouse") {
      dispatch({ type: "SET_HIGHLIGHTED_INDEX", payload: index });
    }
  };

  const handleMouseLeave = () => {
    if (state.navigationSource === "mouse") {
      dispatch({ type: "SET_HIGHLIGHTED_INDEX", payload: -1 });
    }
  };

  const handleMouseMove = () => {
    dispatch({ type: "SET_NAVIGATION_SOURCE", payload: "mouse" });
  };

  // Filtered users based on search query
  const filteredUsers = state.users.filter((user) => {
    return Object.values(user).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) =>
          item.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      } else {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
    });
  });

  // Scroll highlighted user card into view
  useEffect(() => {
    if (state.highlightedIndex !== -1 && listRef.current) {
      listRef.current.children[state.highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      listRef.current.children[state.highlightedIndex]?.focus();
    }
  }, [state.highlightedIndex]);

  return (
    <div className="app">
      <Search
        handleSearch={handleSearch}
        inputRef={searchInputRef}
        handleKeyDown={handleKeyDown}
      />
      {state.searchQuery && (
        <div className="user-list" onKeyDown={handleKeyDown} ref={listRef}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                query={state.searchQuery}
                isHighlighted={index === state.highlightedIndex}
                handleMouseEnter={() => handleMouseEnter(index)}
                handleMouseLeave={handleMouseLeave}
                handleMouseMove={handleMouseMove}
              />
            ))
          ) : (
            <div className="user-card no-user-found">
              <p>No user found!!!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
