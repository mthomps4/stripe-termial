require 'swagger_helper'

RSpec.describe 'Sessions API', type: :request do
  # Create a user for testing before running the tests
  before(:all) do
    @user = User.create!(
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      merchant_attributes: {
        first_name: 'John',
        last_name: 'Doe'
      }
    )
  end

  after(:all) do
    # Clean up test data
    User.destroy_all
  end

  path '/api/login' do
    post 'Creates a session (login)' do
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
              password: { type: :string }
            },
            required: [ 'email', 'password' ]
          }
        },
        required: [ 'user' ]
      }

      response '200', 'user logged in' do
        let(:user) do
          {
            user: {
              email: 'test@example.com',
              password: 'password123'
            }
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['token']).to be_present
          expect(data['user']['email']).to eq('test@example.com')
          expect(data['user']['first_name']).to eq('John')
          expect(data['user']['last_name']).to eq('Doe')
          expect(response.headers['Authorization']).to be_present
        end
      end

      response '401', 'invalid credentials' do
        let(:user) do
          {
            user: {
              email: 'wrong@example.com',
              password: 'wrongpass'
            }
          }
        end

        run_test!
      end
    end
  end

  path '/api/logout' do
    delete 'Ends the session (logout)' do
      tags 'Authentication'
      security [ Bearer: [] ]
      parameter name: 'Authorization', in: :header, type: :string, required: true

      response '200', 'logged out successfully' do
        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }

        run_test!
      end

      response '401', 'unauthorized' do
        let(:Authorization) { nil }
        run_test!
      end
    end
  end
end
