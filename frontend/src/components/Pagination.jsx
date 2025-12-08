import React from "react";

export default function Pagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onPageChange,
}) {
  const MAX_VISIBLE = 5;

  let start = Math.max(1, page - Math.floor(MAX_VISIBLE / 2));
  let end = start + MAX_VISIBLE - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? "active" : ""}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
