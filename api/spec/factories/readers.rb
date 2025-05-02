FactoryBot.define do
  factory :reader do
    association :location
    sequence(:stripe_id) { |n| "rdr_#{SecureRandom.hex(8)}" }
    sequence(:label) { |n| "Reader #{n}" }
    sequence(:serial_number) { |n| "S#{n}#{SecureRandom.hex(6)}" }
    reader_type { "S700" }
  end
end
