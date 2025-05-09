json.products @products do |product|
  json.partial! "api/products/product", product: product
end
json.pagination do
  json.current_page @products.current_page
  json.total_pages @products.total_pages
  json.total_count @products.total_count
  json.has_next_page @products.next_page.present?
  json.has_prev_page @products.prev_page.present?
end
