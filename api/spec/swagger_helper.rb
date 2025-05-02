# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.swagger_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path
  config.swagger_docs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Stripe Terminal API',
        version: 'v1',
        description: 'API for Stripe Terminal integration'
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Development server'
        }
      ],
      components: {
        schemas: {
          # Define the Location schema
          Location: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              stripe_id: { type: :string },
              address_line1: { type: :string },
              address_line2: { type: :string, nullable: true },
              city: { type: :string },
              state: { type: :string },
              postal_code: { type: :string },
              country: { type: :string },
              created_at: { type: :string, format: :datetime },
              updated_at: { type: :string, format: :datetime }
            },
            required: [ 'id', 'name', 'stripe_id', 'address_line1', 'city', 'state', 'postal_code', 'country' ]
          },
          # Define the LocationInput schema (used for creating/updating)
          LocationInput: {
            type: :object,
            properties: {
              name: { type: :string },
              address_line1: { type: :string },
              address_line2: { type: :string, nullable: true },
              city: { type: :string },
              state: { type: :string },
              postal_code: { type: :string },
              country: { type: :string }
            },
            required: [ 'name', 'address_line1', 'city', 'state', 'postal_code', 'country' ]
          }
        }
      },
      paths: {}
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The swagger_docs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.swagger_format = :yaml
end
