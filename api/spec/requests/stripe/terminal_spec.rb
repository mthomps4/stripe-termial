require 'rails_helper'

RSpec.describe 'Stripe Terminal API', type: :request do
  let(:user) { create(:user) }

  describe "POST /api/stripe/terminal/connection_token" do
    context "when authenticated" do
      before do
        # Use sign_in helper for authentication instead of manually creating tokens
        sign_in user
      end

      it "returns a connection token" do
        # Mock Stripe
        connection_token = double(secret: "mock_secret_token")
        allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
          .and_return(connection_token)

        post "/api/stripe/terminal/connection_token"

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)["secret"]).to eq("mock_secret_token")
      end

      it "handles Stripe errors" do
        # Mock error
        allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
          .and_raise(::Stripe::StripeError.new("Stripe API error"))

        post "/api/stripe/terminal/connection_token"

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)["error"]).to eq("Stripe API error")
      end
    end

    it "requires authentication" do
      post "/api/stripe/terminal/connection_token"

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
