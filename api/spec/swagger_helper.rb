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
        title: 'API V1',
        version: 'v1',
        description: 'API Documentation for Location Management System'
      },
      components: {
        schemas: {
          # Location schemas
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
          },
          # User schemas
          User: {
            type: :object,
            properties: {
              email: { type: :string },
              created_at: { type: :string, format: :datetime },
              updated_at: { type: :string, format: :datetime }
            }
          },
          UserInput: {
            type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string },
              password_confirmation: { type: :string },
              merchant_attributes: {
                type: :object,
                properties: {
                  first_name: { type: :string },
                  last_name: { type: :string }
                }
              }
            },
            required: [ 'email', 'password', 'password_confirmation', 'merchant_attributes' ]
          },
          # Response schemas
          Error: {
            type: :object,
            properties: {
              error: { type: :string },
              status: { type: :integer }
            }
          },
          SuccessResponse: {
            type: :object,
            properties: {
              status: {
                type: :object,
                properties: {
                  code: { type: :integer },
                  message: { type: :string }
                }
              },
              data: { type: :object }
            }
          }
        },
        securitySchemes: {
          Bearer: {
            description: "JWT token authentication",
            type: :http,
            scheme: :bearer,
            bearerFormat: 'JWT'
          }
        }
      },
      servers: [
        {
          url: 'http://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'localhost:4000'
            }
          }
        }
      ],
      # Tags for API grouping
      tags: [
        {
          name: 'Authentication',
          description: 'User authentication endpoints'
        },
        {
          name: 'Locations',
          description: 'Location management endpoints'
        }
      ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The swagger_docs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.swagger_format = :yaml
end
