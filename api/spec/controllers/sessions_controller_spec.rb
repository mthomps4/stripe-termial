require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe 'POST #create' do
    let(:user) { create(:user, email: 'test@example.com', password: 'password123') }

    context 'with valid credentials' do
      before do
        # Set up the request
        @request.env['devise.mapping'] = Devise.mappings[:user]
        post :create, params: {
          user: {
            email: user.email,
            password: 'password123'
          }
        }, format: :json
      end

      it 'returns success response' do
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['status']['code']).to eq(200)
        expect(JSON.parse(response.body)['status']['message']).to eq('Logged in successfully.')
      end

      it 'returns user data' do
        expect(JSON.parse(response.body)['data']).to include('email' => user.email)
      end
    end

    context 'with invalid credentials' do
      it 'returns unauthorized status' do
        post :create, params: {
          user: {
            email: user.email,
            password: 'wrong_password'
          }
        }, format: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:user) { create(:user) }

    context 'when user is signed in' do
      before do
        # Set up both Devise session and JWT token
        @request.env['devise.mapping'] = Devise.mappings[:user]
        token = generate_jwt_token_for(user)
        @request.headers['Authorization'] = "Bearer #{token}"
      end

      it 'successfully logs out' do
        delete :destroy, format: :json
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['status']).to eq(200)
        expect(JSON.parse(response.body)['message']).to eq('Logged out successfully.')
      end
    end

    context 'when user is not signed in' do
      it 'returns unauthorized status' do
        delete :destroy, format: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
