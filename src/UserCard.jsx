// UserCard.js
import React from "react";

const UserCard = ({ user, query, isHighlighted }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    // Splitting the text based on the given query, while preserving the query itself
    // The query to be matched, enclosed in parentheses for capturing groups
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlightText">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const itemsContainQuery = user.items.some((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div tabIndex={0} className={`user-card ${isHighlighted ? "focused" : ""}`}>
      <h2>{highlightText(user.name, query)}</h2>
      <p>ID: {highlightText(user.id, query)}</p>
      <p>Address: {highlightText(user.address, query)}</p>
      <p>Pincode: {highlightText(user.pincode, query)}</p>
      <p>
        Items:{" "}
        {user.items.map((item, index) => (
          <span key={index}>{highlightText(item, query)} </span>
        ))}
      </p>
      {itemsContainQuery && (
        <div className="itemsContainQuery">
          <div className="itemsContainQueryCircle">
            <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
              <circle r="3" cx="3" cy="3" fill="#4cb3f7" />
            </svg>
          </div>
          <p className="itemsContainQueryText">{`"${query}" found in items`}</p>
        </div>
      )}
    </div>
  );
};

export default UserCard;
