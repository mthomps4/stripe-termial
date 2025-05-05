FactoryBot.define do
  factory :merchant do
    first_name { "MyString" }
    last_name { "MyString" }
    stripe_account_id { "MyString" }
    stripe_account_status { "MyString" }
    user { nil }
  end
end
