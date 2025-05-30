require 'rails_helper'

RSpec.describe Admin, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:admin)).to be_valid
    end
  end
end
