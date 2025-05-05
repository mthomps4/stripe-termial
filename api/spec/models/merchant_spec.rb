require 'rails_helper'

RSpec.describe Merchant, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:merchant)).to be_valid
    end
  end
end
