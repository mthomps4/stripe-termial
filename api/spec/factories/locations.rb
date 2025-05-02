FactoryBot.define do
  factory :location do
    sequence(:name) { |n| "Location #{n}" }
    sequence(:stripe_id) { |n| "loc_#{SecureRandom.hex(8)}" }
    address_line1 { "123 Main St" }
    address_line2 { nil }
    city { "Portland" }
    state { "OR" }
    postal_code { "97201" }
    country { "US" }
  end
end
