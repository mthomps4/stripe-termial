class LocationService
  def self.create_location(location)
    # In a real implementation, this would call Stripe API
    # This is just a placeholder for the actual implementation
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
    # Build address hash with only non-nil values
    address = {
      line1: location.address_line1,
      city: location.city,
      state: location.state,
      postal_code: location.postal_code
    }

    # Only add line2 if it's not nil
    address[:line2] = location.address_line2 if location.address_line2.present?

    Stripe::Terminal::Location.update(
      location.stripe_id,
      {
        display_name: location.name,
        address: address
      }
    )
  end
end
