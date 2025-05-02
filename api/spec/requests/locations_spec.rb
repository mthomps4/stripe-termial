require 'swagger_helper'

RSpec.describe 'Locations API', type: :request do
  let(:user) { create(:user) }
  let(:token) { generate_jwt_token_for(user) }

  # Mock Stripe location creation
  before do
    allow(LocationService).to receive(:create_location).and_return(
      OpenStruct.new(id: 'loc_test123')
    )
  end

  path '/api/locations' do
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
      security [ Bearer: [] ]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :Authorization, in: :header, type: :string, required: true
      parameter name: :location, in: :body, schema: {
        type: :object,
        properties: {
          location: { '$ref' => '#/components/schemas/LocationInput' }
        },
        required: [ 'location' ]
      }

      response '201', 'location created' do
        let(:Authorization) { "Bearer #{token}" }
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

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['stripe_id']).to match(/^loc_test/)
        end
      end

      response '401', 'unauthorized' do
        let(:Authorization) { nil }
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
        let(:Authorization) { "Bearer #{token}" }
        let(:location) { { location: { name: '' } } }
        run_test!
      end
    end
  end
end
