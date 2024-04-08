// UserCard.js
import React from "react";

const UserCard = ({ user, query }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    // Splitting the text based on the given query, while preserving the query itself
    // The query to be matched, enclosed in parentheses for capturing groups
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ color: "blue" }}>
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
    <div className="user-card">
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
        <p style={{ color: "blue" }}>{`${query} found in items`}</p>
      )}
    </div>
  );
};

export default UserCard;
