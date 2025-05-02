class LocationService
  def self.create_location(location)
    # Build address hash with proper handling of nil values
    address = {
      line1: location.address_line1,
      city: location.city,
      state: location.state,
      postal_code: location.postal_code,
      country: location.country
    }
    
    # Only add line2 if it's not nil
    address[:line2] = location.address_line2 if location.address_line2.present?
    
    Stripe::Terminal::Location.create({
      display_name: location.name,
      address: address
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
