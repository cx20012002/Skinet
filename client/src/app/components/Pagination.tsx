import React from "react";

type Props = {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, pageSize, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <button
                className={`px-5 py-2 rounded-md ${
                    isFirstPage ? "bg-gray-300 cursor-default" : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFirstPage}
            >
                Previous
            </button>

            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`px-3 py-2 rounded-md ${
                        pageNumber === currentPage ? "bg-gray-600 text-white cursor-default" : "bg-gray-300 hover:text-white hover:bg-gray-600"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                className={`px-5 py-2 rounded-md ${
                    isLastPage ? "bg-gray-300 cursor-default" : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
