/* eslint-disable react/prop-types */
const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="w-full text-center">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`mt-5 px-4 py-2 border rounded mx-1 ${
            currentPage === page ? "bg-accent text-white" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
