require 'rails_helper'

RSpec.describe Stripe::TerminalController, type: :controller do
  before do
    # Sign in a user
    @user = FactoryBot.create(:user)
    sign_in_user @user
  end

  describe "POST #connection_token" do
    it "returns a connection token" do
      # Mock the Stripe Terminal ConnectionToken creation
      connection_token = double(secret: "mock_secret_token")
      allow(::Stripe::Terminal::ConnectionToken).to receive(:create).and_return(connection_token)

      post :connection_token

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["secret"]).to eq("mock_secret_token")
    end

    it "handles Stripe errors" do
      # Mock a Stripe error
      allow(::Stripe::Terminal::ConnectionToken).to receive(:create)
        .and_raise(::Stripe::StripeError.new("Stripe API error"))

      post :connection_token

      expect(response).to have_http_status(:bad_request)
      expect(JSON.parse(response.body)["error"]).to eq("Stripe API error")
    end

    it "requires authentication" do
      sign_out @user

      post :connection_token

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
