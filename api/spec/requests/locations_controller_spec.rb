require 'rails_helper'

RSpec.describe LocationsController, type: :request do
  let(:user) { create(:user) }
  let(:auth_headers) { { 'Authorization' => "Bearer #{generate_jwt_token_for(user)}" } }

  before do
    allow(LocationService).to receive(:create_location).and_return(
      OpenStruct.new(id: 'loc_test123')
    )
  end

  describe "GET /api/locations" do
    before do
      create_list(:location, 3)
    end

    it "returns a list of locations" do
      get "/api/locations"

      expect(response).to have_http_status(:ok)
      expect(json_response["locations"].count).to eq(3)
      expect(json_response).to have_key("meta")
    end

    it "supports pagination" do
      create_list(:location, 10)  # Create additional locations

      get "/api/locations", params: { per_page: 5, page: 2 }

      expect(response).to have_http_status(:ok)
      expect(json_response["locations"].count).to eq(5)
      expect(json_response["meta"]["current_page"]).to eq(2)
    end
  end

  describe "POST /api/locations" do
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
      it "creates a location" do
        post "/api/locations",
             params: valid_attributes,
             headers: auth_headers

        expect(response).to have_http_status(:created)
        expect(json_response["name"]).to eq("Test Store")
        expect(json_response["stripe_id"]).to match(/loc_test/)
      end
    end

    context "when the request is invalid" do
      it "returns status code 422" do
        post "/api/locations",
             params: { location: { name: "" } },
             headers: auth_headers

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "when not authenticated" do
      it "returns status code 401" do
        post "/api/locations", params: valid_attributes

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
