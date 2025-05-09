require 'swagger_helper'

RSpec.describe 'Stripe Terminal API', type: :request do
  path '/api/stripe/terminal/connection_token' do
    post 'Creates a connection token for Stripe Terminal' do
      tags 'Stripe Terminal'
      security [ { Bearer: [] } ]
      produces 'application/json'
      
      description 'Creates a connection token for Stripe Terminal. Requires authentication. 
                  To test: First call POST /api/login with valid credentials to get a token,
                  then click "Authorize" at the top of this page and enter that token.'

      response '200', 'connection token generated' do
        schema type: :object,
          properties: {
            secret: { type: :string }
          },
          required: [ 'secret' ]

        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }

        before do
          # Mock the Stripe Terminal ConnectionToken creation
          connection_token = double(secret: "mock_secret_token")
          allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
            .and_return(connection_token)
        end

        run_test!
      end

      response '400', 'stripe error' do
        schema type: :object,
          properties: {
            error: { type: :string }
          },
          required: [ 'error' ]

        let(:user) { create(:user) }
        let(:Authorization) { "Bearer #{generate_jwt_token_for(user)}" }

        before do
          # Mock a Stripe error
          allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
            .and_raise(::Stripe::StripeError.new("Stripe API error"))
        end

        run_test!
      end

      response '401', 'unauthorized' do
        let(:Authorization) { nil }
        run_test!
      end
    end
  end

  # Helper method to generate JWT token
  def generate_jwt_token_for(user)
    Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
  end
end
