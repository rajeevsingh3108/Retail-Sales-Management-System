import React from "react";

export default function Pagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}) {
  return (
    <div className="pagination">
      <button
        type="button"
        disabled={!hasPrev}
        onClick={onPrev}
        aria-disabled={!hasPrev}
      >
        Prev
      </button>

      <span>
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        type="button"
        disabled={!hasNext}
        onClick={onNext}
        aria-disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
