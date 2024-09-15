import React from "react";

export default function Pagination({
  currentPage,
  dataPerPage,
  totalItems,
  paginate,
  showingText,
}) {
  const totalPages = Math.ceil(totalItems / dataPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to render page numbers with ellipsis if needed
  const renderPageNumbers = () => {
    const items = [];

    if (totalPages <= 5) {
      // Show all page numbers if they are less than or equal to 5
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`py-2 px-4 ${
              i === currentPage
                ? "bg-gray-200 font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show a range of page numbers with ellipsis
      if (currentPage > 2) {
        items.push(
          <button
            key={1}
            onClick={() => paginate(1)}
            className={`py-2 px-4 ${
              currentPage === 1
                ? "bg-gray-200 font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </button>
        );
        if (currentPage > 3) {
          items.push(
            <span key="start-ellipsis" className="py-2 px-4 text-gray-700">
              ...
            </span>
          );
        }
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`py-2 px-4 ${
              i === currentPage
                ? "bg-gray-200 font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <span key="end-ellipsis" className="py-2 px-4 text-gray-700">
            ...
          </span>
        );
        items.push(
          <button
            key={totalPages}
            onClick={() => paginate(totalPages)}
            className={`py-2 px-4 ${
              currentPage === totalPages
                ? "bg-gray-200 font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return items;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-y-3 my-10">
      {/* Showing text */}
      <div className="flex justify-start items-center font-semibold">
        {showingText}
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center">
        <nav aria-label="Pagination">
          <ul className="inline-flex border rounded-sm shadow-md">
            <li>
              <button
                className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                &#x2190;
              </button>
            </li>
            <li className="flex items-center">
              {renderPageNumbers()}
            </li>
            <li>
              <button
                className="py-2 px-4 text-gray-700 bg-gray-100 focus:outline-none"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                &#x2192;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
