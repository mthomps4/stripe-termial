# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# Find user by email only, or create with password if it doesn't exist
admin = User.find_by(email: "admin@asdf.com")
unless admin
  admin = User.create!(email: "admin@asdf.com", password: "asdfasdf", password_confirmation: "asdfasdf")
end
Admin.find_or_create_by(user: admin)

merchant = User.find_by(email: "merchant@asdf.com")
unless merchant
  merchant = User.create!(email: "merchant@asdf.com", password: "asdfasdf", password_confirmation: "asdfasdf")
end
Merchant.find_or_create_by(user: merchant, first_name: "John", last_name: "Doe")

10.times do |i|
  count = i + 1
  Product.create(name: "Product #{count}", price: count * 100)
end
