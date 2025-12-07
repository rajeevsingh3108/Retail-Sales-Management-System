import React from 'react';
export default function SortingBar({ sortBy, sortOrder, setSortBy, setSortOrder }) {
  return (
    <div className="sorting">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="customerName">Sort by:Customer Name (A-Z)</option>
        <option value="quantity">Quantity</option>
        <option value="date">Date</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}
