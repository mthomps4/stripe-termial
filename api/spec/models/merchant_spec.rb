require 'rails_helper'

RSpec.describe Merchant, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:stripe_account_id) }
    it { should validate_presence_of(:stripe_account_status) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:merchant)).to be_valid
    end
  end
end
