require 'rails_helper'

RSpec.describe LocationsController, type: :request do
  describe "GET /api/v1/locations" do
    before do
      create_list(:location, 3)
    end

    it "returns a list of locations" do
      get "/api/v1/locations"

      expect(response).to have_http_status(:ok)
      expect(json_response["locations"].count).to eq(3)
      expect(json_response).to have_key("meta")
    end

    it "supports pagination" do
      create_list(:location, 10)

      get "/api/v1/locations", params: { per_page: 5, page: 2 }

      expect(response).to have_http_status(:ok)
      expect(json_response["locations"].count).to eq(5)
      expect(json_response["meta"]["current_page"]).to eq(2)
    end
  end

  describe "POST /api/v1/locations" do
    let(:valid_attributes) do
      {
        location: {
          name: "Test Store",
          address_line1: "123 Main St",
          city: "Portland",
          state: "OR",
          postal_code: "97201",
          country: "US"
        }
      }
    end

    context "when the request is valid" do
      before do
        # No need to explicitly mock here since the global mock is in place
        post "/api/v1/locations", params: valid_attributes
      end

      it "creates a location" do
        expect(response).to have_http_status(:created)
        expect(json_response["name"]).to eq("Test Store")
        expect(json_response["stripe_id"]).to match(/loc_test/)
      end
    end

    context "when the request is invalid" do
      before do
        post "/api/v1/locations", params: { location: { name: "" } }
      end

      it "returns status code 422" do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
