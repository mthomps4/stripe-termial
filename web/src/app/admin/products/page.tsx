"use client";

import { useState } from "react";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useDebounce } from "use-debounce";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProducts({ searchParam: debouncedSearchTerm });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      </div>
    </div>
  );
}
