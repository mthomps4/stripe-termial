require 'swagger_helper'

RSpec.describe 'Locations API', type: :request do
  path '/api/v1/locations' do
    get 'List locations' do
      tags 'Locations'
      produces 'application/json'
      parameter name: :page, in: :query, type: :integer, required: false
      parameter name: :per_page, in: :query, type: :integer, required: false

      response '200', 'locations found' do
        schema type: :object,
          properties: {
            locations: {
              type: :array,
              items: { '$ref' => '#/components/schemas/Location' }
            },
            meta: {
              type: :object,
              properties: {
                total_pages: { type: :integer },
                total_count: { type: :integer },
                current_page: { type: :integer },
                per_page: { type: :integer },
                next_page: { type: :integer, nullable: true },
                prev_page: { type: :integer, nullable: true }
              }
            }
          }
        run_test!
      end
    end

    post 'Creates a location' do
      tags 'Locations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :location, in: :body, schema: {
        type: :object,
        properties: {
          location: { '$ref' => '#/components/schemas/LocationInput' }
        },
        required: [ 'location' ]
      }

      response '201', 'location created' do
        let(:location) do
          {
            location: {
              name: 'Test Store',
              address_line1: '123 Main St',
              city: 'Portland',
              state: 'OR',
              postal_code: '97201',
              country: 'US'
            }
          }
        end
        run_test!
      end

      response '422', 'invalid request' do
        let(:location) { { location: { name: '' } } }
        run_test!
      end
    end
  end
end
