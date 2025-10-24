export default function Pagination({
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}) {
  return (
    <div className="category__pagination">
      <div className="category__pagination-pages">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      <div className="category__pagination-info">
        Показано {currentPage} из {totalProducts}
      </div>
    </div>
  );
}
