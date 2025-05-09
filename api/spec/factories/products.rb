FactoryBot.define do
  factory :product do
    sequence(:name) { |n| "Product #{n}" }
    price { 1000 }
  end
end
