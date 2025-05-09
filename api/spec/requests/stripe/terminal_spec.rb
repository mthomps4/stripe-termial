require 'rails_helper'

RSpec.describe 'Stripe Terminal API', type: :request do
  let(:user) { create(:user) }
  let(:auth_headers) { jwt_headers_for(user) }

  describe "POST /api/stripe/terminal/connection_token" do
    context "when authenticated" do
      it "returns a connection token" do
        # Mock Stripe
        connection_token = double(secret: "mock_secret_token")
        allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
          .and_return(connection_token)

        # Make authenticated request
        post "/api/stripe/terminal/connection_token", headers: auth_headers

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)["secret"]).to eq("mock_secret_token")
      end

      it "handles Stripe errors" do
        # Mock error
        allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
          .and_raise(::Stripe::StripeError.new("Stripe API error"))

        # Make authenticated request
        post "/api/stripe/terminal/connection_token", headers: auth_headers

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)["error"]).to eq("Stripe API error")
      end
    end

    it "requires authentication" do
      post "/api/stripe/terminal/connection_token"

      expect(response).to have_http_status(:unauthorized)
    end
  end

  # Helper method to generate JWT headers
  def jwt_headers_for(user)
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    {
      'Authorization' => "Bearer #{token}",
      'Accept' => 'application/json'
    }
  end
end
