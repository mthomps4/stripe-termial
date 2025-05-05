FactoryBot.define do
  factory :admin do
    first_name { "MyString" }
    last_name { "MyString" }
    user { create(:user) }
  end
end
