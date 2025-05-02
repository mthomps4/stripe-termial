require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_attributes) { { email: 'newuser@example.com', password: 'password123', password_confirmation: 'password123' } }

      it 'creates a new user and returns JWT token' do
        expect {
          post :create, params: { user: valid_attributes }, format: :json
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:ok)
        expect(response.headers['Authorization']).to be_present
        expect(JSON.parse(response.body)['status']['message']).to eq('Signed up successfully.')
        expect(JSON.parse(response.body)['data']['email']).to eq('newuser@example.com')
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) { { email: 'invalid-email', password: 'short' } }

      it 'does not create a new user' do
        expect {
          post :create, params: { user: invalid_attributes }, format: :json
        }.not_to change(User, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['status']['message']).to include("User couldn't be created successfully")
      end
    end
  end
end
