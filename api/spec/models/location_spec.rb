require 'rails_helper'

RSpec.describe Location, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:stripe_id) }
    it { should validate_presence_of(:address_line1) }
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:postal_code) }
    it { should validate_presence_of(:country) }

    it { should validate_uniqueness_of(:stripe_id) }
    it { should validate_uniqueness_of(:name) }
  end

  describe 'callbacks' do
    it 'updates the Stripe location after update' do
      # Create a location with explicit nil for address_line2
      location = create(:location, address_line2: nil)

      # Use a more strict expectation that verifies the method is called
      # but doesn't actually execute it
      expect(LocationService).to receive(:update_location).with(location).once

      # Trigger the callback
      location.update(name: "Updated Name")
    end
  end
end
