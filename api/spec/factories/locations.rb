FactoryBot.define do
  factory :location do
    sequence(:name) { |n| "Test Location #{n}" }
    sequence(:stripe_id) { |n| "loc_test#{n}" }
    address_line1 { "123 Main St" }
    city { "Portland" }
    state { "OR" }
    postal_code { "97201" }
    country { "US" }
  end
end
