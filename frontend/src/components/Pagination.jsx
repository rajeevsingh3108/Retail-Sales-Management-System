import React from 'react';
export default function Pagination({ page, totalPages, hasNext, hasPrev, onNext, onPrev }) {
  return (
    <div className="pagination">
      <button disabled={!hasPrev} onClick={onPrev}>Prev</button>
      <span>{page}</span>
      <button disabled={!hasNext} onClick={onNext}>Next</button>
    </div>
  );
}
