import React from 'react';

type PaginationProps = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  pageNumber,
  totalPages,
  onPageChange
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (startPage > 1) {
        pages.unshift('first');
      }
      if (endPage < totalPages) {
        pages.push('last');
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page !== pageNumber && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between mt-6 mx-auto w-fit">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className={`px-3 py-1 rounded ${
            pageNumber === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Prev
        </button>
        
        {pages.map((page, index) => {
          if (page === 'first') {
            return (
              <React.Fragment key="first">
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-50 border"
                >
                  1
                </button>
                <span className="px-1">...</span>
              </React.Fragment>
            );
          }
          
          if (page === 'last') {
            return (
              <React.Fragment key="last">
                <span className="px-1">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-50 border"
                >
                  {totalPages}
                </button>
              </React.Fragment>
            );
          }
          
          return (
            <button
              key={index}
              onClick={() => handlePageChange(page as number)}
              className={`px-3 py-1 rounded ${
                pageNumber === page
                  ? 'bg-[#335F32] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border'
              }`}
            >
              {page}
            </button>
          );
        })}
        
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className={`px-3 py-1 rounded ${
            pageNumber === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;