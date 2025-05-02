# This file sets up comprehensive mocking for Stripe API calls
module StripeMockHelper
  # These methods will be included in RSpec examples
  def mock_stripe_terminal_location_create(return_id: "loc_test#{rand(1000)}")
    allow(Stripe::Terminal::Location).to receive(:create) do |params|
      location_double = instance_double("Stripe::Terminal::Location",
        id: return_id,
        display_name: params[:display_name],
        address: params[:address]
      )
      location_double
    end
  end

  def mock_stripe_terminal_location_update
    allow(Stripe::Terminal::Location).to receive(:update) do |id, params|
      location_double = instance_double("Stripe::Terminal::Location",
        id: id,
        display_name: params[:display_name],
        address: params[:address]
      )
      location_double
    end
  end
end

# Configure RSpec to use the helper
RSpec.configure do |config|
  # Include the helper methods in all spec files
  config.include StripeMockHelper

  # Set up Stripe mocks before each test
  config.before(:each) do
    # Call the instance methods directly
    mock_stripe_terminal_location_create
    mock_stripe_terminal_location_update
  end
end

module StripeMocks
  def mock_stripe_terminal_location
    Stripe::Terminal::Location.new(
      id: 'loc_123456',
      display_name: 'Test Location',
      address: {
        line1: '123 Main St',
        city: 'Testville',
        state: 'TS',
        postal_code: '12345',
        country: 'US'
      }
    )
  end
end

RSpec.configure do |config|
  config.include StripeMocks
end
