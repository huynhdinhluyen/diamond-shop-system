/* eslint-disable react/prop-types */
const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const shouldShowPageNumber = (pageNumber) => {
    if (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      Math.abs(pageNumber - currentPage) <= 1
    ) {
      return true;
    }
    return false;
  };

  for (let i = 1; i <= totalPages; i++) {
    if (shouldShowPageNumber(i)) {
      pages.push(i);
    } else if (i === 2 || i === totalPages - 1) {
      pages.push("...");
    }
  }

  pages = pages.filter(
    (page, index) => page !== "..." || pages[index - 1] !== "..."
  );


  return (
    <div className="w-full text-center">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && setCurrentPage(page)}
          className={`mt-5 px-4 py-2 border rounded mx-1 ${currentPage === page ? "bg-accent text-white" : "bg-white"
            } $${page === "..." ? "cursor-default border-none" : "border"}`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
