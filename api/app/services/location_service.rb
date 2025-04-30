class LocationService
  def self.create_location(location)
    Stripe::Terminal::Location.create({
      display_name: location.name,
      address: {
        line1: location.address_line1,
        line2: location.address_line2,
        city: location.city,
        state: location.state,
        postal_code: location.postal_code,
        country: location.country
      }
    })
  end

  def self.update_location(location)
    Stripe::Terminal::Location.update(
      location.stripe_id,
      {
        display_name: location.name,
        address: {
          line1: location.address_line1,
          line2: location.address_line2,
          city: location.city,
          state: location.state,
          postal_code: location.postal_code,
        }
      }
    )
  end
end
