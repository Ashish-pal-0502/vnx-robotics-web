"use client";

import React from "react";
import Image from "next/image";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-6 py-2 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-30 cursor-pointer transition"
      >
        <Image
          src="/icons/pagination-left.png"
          alt="Prev"
          width={14}
          height={14}
        />
      </button>

      <div className="flex items-center gap-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`text-lg cursor-pointer transition ${
              currentPage === page
                ? "font-bold text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-30 cursor-pointer transition"
      >
        <Image
          src="/icons/pagination-right.png"
          alt="Next"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
};

export default Pagination;
