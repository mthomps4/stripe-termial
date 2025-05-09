require 'swagger_helper'

RSpec.describe 'Products API', type: :request do
  path '/api/products' do
    get 'Lists all products' do
      tags 'Products'
      security [ { bearer: [] } ]
      parameter name: :page, in: :query, type: :integer, required: false, description: 'Page number'
      parameter name: :per_page, in: :query, type: :integer, required: false, description: 'Items per page'

      response '200', 'products found' do
        schema type: :object,
          properties: {
            products: {
              type: :array,
              items: {
                type: :object,
                properties: {
                  id: { type: :integer },
                  name: { type: :string },
                  price: { type: :integer },
                  created_at: { type: :string, format: 'date-time' },
                  updated_at: { type: :string, format: 'date-time' }
                }
              }
            },
            pagination: {
              type: :object,
              properties: {
                current_page: { type: :integer },
                total_pages: { type: :integer },
                total_count: { type: :integer },
                has_next_page: { type: :boolean },
                has_prev_page: { type: :boolean }
              }
            }
          }

        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{JWT::Auth::Token.new.encode(user_id: user.id)}" }
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end

    post 'Creates a product' do
      tags 'Products'
      security [ { bearer: [] } ]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :product, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          price: { type: :integer }
        },
        required: [ 'name', 'price' ]
      }

      response '201', 'product created' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            price: { type: :integer },
            created_at: { type: :string, format: 'date-time' },
            updated_at: { type: :string, format: 'date-time' }
          }

        let(:user) { create(:user) }
        let!(:admin) { Admin.create(user: user) }
        let(:Authorization) { "Bearer #{JWT::Auth::Token.new.encode(user_id: user.id)}" }
        let(:product) { { name: 'Test Product', price: 1000 } }
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end
  end

  path '/api/products/{id}' do
    parameter name: :id, in: :path, type: :integer, required: true

    get 'Retrieves a product' do
      tags 'Products'
      security [ { bearer: [] } ]
      produces 'application/json'

      response '200', 'product found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            price: { type: :integer },
            created_at: { type: :string, format: 'date-time' },
            updated_at: { type: :string, format: 'date-time' }
          }

        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{JWT::Auth::Token.new.encode(user_id: user.id)}" }
        let(:id) { create(:product).id }
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end

    put 'Updates a product' do
      tags 'Products'
      security [ { bearer: [] } ]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :product, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          price: { type: :integer }
        }
      }

      response '200', 'product updated' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            price: { type: :integer },
            created_at: { type: :string, format: 'date-time' },
            updated_at: { type: :string, format: 'date-time' }
          }

        let(:user) { create(:user) }
        let!(:admin) { Admin.create(user: user) }
        let(:Authorization) { "Bearer #{JWT::Auth::Token.new.encode(user_id: user.id)}" }
        let(:id) { create(:product).id }
        let(:product) { { name: 'Updated Product' } }
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end

    delete 'Deletes a product' do
      tags 'Products'
      security [ { bearer: [] } ]

      response '204', 'product deleted' do
        let(:user) { create(:user) }
        let!(:admin) { Admin.create(user: user) }
        let(:Authorization) { "Bearer #{JWT::Auth::Token.new.encode(user_id: user.id)}" }
        let(:id) { create(:product).id }
        run_test!
      end

      response '401', 'unauthorized' do
        run_test!
      end
    end
  end
end
