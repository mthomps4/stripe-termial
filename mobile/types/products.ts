export interface GetProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  last_updated: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_count: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}
