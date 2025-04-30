class Location < ApplicationRecord
  validates :name, :stripe_id, :address_line1, :city, :state, :postal_code, :country, presence: true
  validates :stripe_id, uniqueness: true
  validates :name, uniqueness: true
  after_update :update_stripe_location

  private

  def update_stripe_location
    LocationService.update_location(self)
  end
end
