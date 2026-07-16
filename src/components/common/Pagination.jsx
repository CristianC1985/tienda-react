import { Pagination as BsPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <BsPagination className="justify-content-center flex-wrap">
      <BsPagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {paginas.map((p) => (
        <BsPagination.Item
          key={p}
          active={p === currentPage}
          onClick={() => onPageChange(p)}
        >
          {p}
        </BsPagination.Item>
      ))}
      <BsPagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </BsPagination>
  );
};

export default Pagination;
