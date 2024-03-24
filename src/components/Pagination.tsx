import React from "react";

const Pagination = ({
  currentPage,
  totalDisplayedPages,
  handlePageChange,
}: any) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPage = Math.min(totalDisplayedPages, currentPage + 3);
    const minPage = Math.max(1, maxPage - 6);

    if (currentPage > 1) {
      pages.push(
        <button
          key="<<"
          onClick={() => handlePageChange(1)}
          className="mx-1 rounded-md px-1 py-1"
        >
          {"<<"}
        </button>,
      );
      pages.push(
        <button
          key="<"
          onClick={() => handlePageChange(currentPage - 1)}
          className="mx-1 rounded-md px-1 py-1"
        >
          {"<"}
        </button>,
      );
    }

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 rounded-md px-1 py-1`}
          style={{
            color: i === currentPage ? "#000000" : "#ACACAC",
          }}
        >
          {i}
        </button>,
      );
    }

    if (maxPage < totalDisplayedPages) {
      pages.push(<span key="ellipsis-right">...</span>);
      pages.push(
        <button
          key={totalDisplayedPages}
          onClick={() => handlePageChange(totalDisplayedPages)}
          className="mx-1 rounded-md px-1 py-1"
        >
          {totalDisplayedPages}
        </button>,
      );
    }

    if (currentPage < totalDisplayedPages) {
      pages.push(
        <button
          key=">"
          onClick={() => handlePageChange(currentPage + 1)}
          className="mx-1 rounded-md px-1 py-1"
        >
          {">"}
        </button>,
      );
      pages.push(
        <button
          key=">>"
          onClick={() => handlePageChange(totalDisplayedPages)}
          className="mx-1 rounded-md px-1 py-1"
        >
          {">>"}
        </button>,
      );
    }

    return pages;
  };

  return <div className="mt-4 flex items-center overflow-x-auto">{renderPageNumbers()}</div>;
};

export default Pagination;
