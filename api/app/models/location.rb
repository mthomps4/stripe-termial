class Location < ApplicationRecord
  validates :name, :stripe_id, :address_line1, :city, :state, :postal_code, :country, presence: true
  validates :stripe_id, uniqueness: true
  validates :name, uniqueness: true
  after_update :update_stripe_location

  private

  def update_stripe_location
    LocationService.update_location(self)
  end

  def self.ransackable_attributes(auth_object = nil)
    ["address_line1", "address_line2", "city", "country", "created_at", "id", "name", "postal_code", "state", "stripe_id", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
