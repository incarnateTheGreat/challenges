import React, { useEffect, useState } from "react";
import { assignActivePageClass } from "utils/utils";

const Pagination = ({ data, pageNumber, setPageNumber }) => {
  const [nextPageNumber, setNextPageNumber] = useState<number | null>(null);
  const [prevPageNumber, setPrevPageNumber] = useState<number | null>(null);
  const [lastPageNumber, setLastPageNumber] = useState<number | null>(null);

  // Set the previous, next, and last variables for navigation.
  useEffect(() => {
    setPrevPageNumber(data?.links?.prev ?? null);
    setNextPageNumber(data?.links?.next);
    setLastPageNumber(data?.links?.last);
  }, [data]);

  // Programmatically render out the number of pages as buttons.
  const renderPageNumbers = () => {
    return Array(lastPageNumber)
      .fill(null)
      .map((_, i) => (
        <button
          key={i}
          type="button"
          className={assignActivePageClass(pageNumber, i + 1)}
          onClick={() => setPageNumber(i + 1)}
          title={`Page ${i + 1}`}
        >
          {i + 1}
        </button>
      ));
  };

  return (
    <nav className="pagination">
      <button
        disabled={!prevPageNumber}
        onClick={() => {
          if (prevPageNumber) {
            setPageNumber(prevPageNumber);
          }
        }}
        type="button"
        title="Previous page"
        className="pagination-link"
      >
        &#171; Previous page
      </button>
      <div className="pagination-pages">{renderPageNumbers()}</div>
      <button
        disabled={pageNumber === lastPageNumber}
        onClick={() => {
          if (pageNumber < lastPageNumber) {
            setPageNumber(nextPageNumber);
          }
        }}
        type="button"
        title="Next page"
        className="pagination-link"
      >
        Next page &#8250;
      </button>
    </nav>
  );
};

export default Pagination;
