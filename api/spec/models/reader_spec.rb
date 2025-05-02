require 'rails_helper'

RSpec.describe Reader, type: :model do
  describe 'associations' do
    it { should belong_to(:location) }
  end
end
