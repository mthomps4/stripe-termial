require 'rails_helper'

RSpec.describe LocationsController, type: :controller do
  let(:user) { create(:user) }
  let(:valid_attributes) { { name: 'Test Location', address_line1: '123 Main St', city: 'Testville', state: 'TS', postal_code: '12345', country: 'US' } }
  let(:invalid_attributes) { { name: nil, address_line1: nil } }
  let!(:location) { create(:location) }

  # Mock the Stripe service call with a class method, not instance method
  before do
    allow(LocationService).to receive(:create_location).and_return(OpenStruct.new(id: 'loc_123456'))
  end

  describe 'GET #index' do
    it 'returns a success response without authentication' do
      get :index, format: :json
      expect(response).to be_successful
      expect(JSON.parse(response.body)['locations']).to be_present
    end
  end

  describe 'GET #show' do
    it 'returns a success response without authentication' do
      get :show, params: { id: location.to_param }, format: :json
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid JWT authentication' do
      before do
        # Set both authentication headers
        request.headers['Authorization'] = "Bearer #{generate_jwt_token_for(user)}"
      end

      it 'creates a new Location' do
        expect {
          post :create, params: { location: valid_attributes }, format: :json
        }.to change(Location, :count).by(1)
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to include('name' => 'Test Location')
      end
    end

    context 'without authentication' do
      it 'returns unauthorized' do
        post :create, params: { location: valid_attributes }, format: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid params' do
      before { request.headers['Authorization'] = "Bearer #{generate_jwt_token_for(user)}" }

      it 'returns unprocessable entity status' do
        post :create, params: { location: invalid_attributes }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid JWT authentication' do
      before { request.headers['Authorization'] = "Bearer #{generate_jwt_token_for(user)}" }

      it 'updates the requested location' do
        put :update, params: { id: location.to_param, location: { name: 'Updated Name' } }, format: :json
        location.reload
        expect(location.name).to eq('Updated Name')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'without authentication' do
      it 'returns unauthorized' do
        put :update, params: { id: location.to_param, location: { name: 'Updated Name' } }, format: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'with valid JWT authentication' do
      before { request.headers['Authorization'] = "Bearer #{generate_jwt_token_for(user)}" }

      it 'destroys the requested location' do
        expect {
          delete :destroy, params: { id: location.to_param }, format: :json
        }.to change(Location, :count).by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'without authentication' do
      it 'returns unauthorized' do
        delete :destroy, params: { id: location.to_param }, format: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
