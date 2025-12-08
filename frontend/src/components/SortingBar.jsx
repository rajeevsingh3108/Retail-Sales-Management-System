import React from "react";

export default function SortingBar({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}) {
  return (
    <div className="sorting">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="customerName">Sort by: Customer Name (A–Z)</option>
        <option value="quantity">Sort by: Quantity</option>
        <option value="date">Sort by: Date</option>
      </select>
    </div>
  );
}
