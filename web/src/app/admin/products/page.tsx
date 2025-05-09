"use client";

import { useState } from "react";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useDebounce } from "use-debounce";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { data, isLoading, error } = useGetProducts({
    searchParam: debouncedSearchTerm,
    page,
    perPage,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No Products Found</div>;
  }

  const { products, pagination } = data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        autoFocus
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="border p-2 mb-4 rounded"
      />

      {products?.length === 0 && <div>No products found</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(product.last_updated).toLocaleDateString()}
            </p>
          </div>
        ))}

        <div className="col-span-full mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {pagination.current_page} of {pagination.total_pages} (
            {pagination.total_count} total products)
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(parseInt(e.target.value));
                setPage(1);
              }}
              className="ml-4 p-1 border rounded"
            >
              <option value="1">1 per page</option>
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((page) => Math.max(1, page - 1))}
              disabled={!pagination.has_prev_page}
              className="px-3 py-1 btn-secondary"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((page) => page + 1)}
              disabled={!pagination.has_next_page}
              className="px-3 py-1 btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
