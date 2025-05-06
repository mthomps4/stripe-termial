json.products @products do |product|
  json.partial! 'api/products/product', product: product
end