# Create Stripe stubs for testing if the real Stripe gem is causing issues
unless defined?(Stripe)
  module Stripe
    module Terminal
      class Location
        attr_accessor :id, :display_name, :address

        def initialize(id:, display_name:, address:)
          @id = id
          @display_name = display_name
          @address = address
        end

        def self.create(params)
          new(
            id: "loc_#{SecureRandom.hex(10)}",
            display_name: params[:display_name],
            address: params[:address]
          )
        end
      end
    end
  end
end
