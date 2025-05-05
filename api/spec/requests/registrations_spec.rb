require 'swagger_helper'

RSpec.describe 'Registrations API', type: :request do
  # Clean up users before each test to avoid duplicate email errors
  before(:each) do
    User.where(email: 'newuser@example.com').destroy_all
  end

  path '/api/signup' do
    post 'Creates a user account' do
      tags 'Authentication'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string },
              password_confirmation: { type: :string }
            },
            required: [ 'email', 'password', 'password_confirmation' ]
          }
        },
        required: [ 'user' ]
      }

      response '200', 'user created' do
        let(:user) do
          {
            user: {
              email: 'newuser@example.com',
              password: 'password123',
              password_confirmation: 'password123'
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['user']['email']).to eq('newuser@example.com')
          expect(response.headers['Authorization']).to be_present
        end
      end

      response '422', 'invalid request' do
        let(:user) do
          {
            user: {
              email: 'invalid-email',
              password: 'short',
              password_confirmation: 'nomatch'
            }
          }
        end

        run_test!
      end
    end
  end
end
