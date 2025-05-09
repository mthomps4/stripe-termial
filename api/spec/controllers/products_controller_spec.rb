require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  render_views

  let(:valid_attributes) { { name: "Test Product", price: 1000 } }
  let(:product) { FactoryBot.create(:product) }

  describe "GET #index" do
    context "with valid authentication" do
      before do
        @user = FactoryBot.create(:user)
        sign_in @user
      end

      it "returns a success response" do
        get :index
        expect(response).to have_http_status(:ok)
      end

      it "returns paginated results" do
        # Create some products
        FactoryBot.create_list(:product, 3)
        get :index, params: { per_page: 2, page: 1 }
        expect(response).to have_http_status(:ok)
        expect(assigns(:products).count).to eq(2)
      end
    end

    context "without authentication" do
      it "returns unauthorized" do
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET #show" do
    context "with valid authentication" do
      before do
        @user = FactoryBot.create(:user)
        sign_in @user
      end

      it "returns a success response" do
        get :show, params: { id: product.id }
        expect(response).to have_http_status(:ok)
      end
    end

    context "without authentication" do
      it "returns unauthorized" do
        get :show, params: { id: product.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "POST #create" do
    context "with admin authentication" do
      before do
        @admin_user = FactoryBot.create(:user)
        Admin.create(user: @admin_user)
        sign_in @admin_user
      end

      it "creates a new product" do
        expect {
          post :create, params: { product: valid_attributes }
        }.to change(Product, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with regular user authentication" do
      before do
        @user = FactoryBot.create(:user)
        sign_in @user
      end

      it "returns unauthorized" do
        post :create, params: { product: valid_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without authentication" do
      it "returns unauthorized" do
        post :create, params: { product: valid_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "PUT #update" do
    context "with admin authentication" do
      before do
        @admin_user = FactoryBot.create(:user)
        Admin.create(user: @admin_user)
        sign_in @admin_user
      end

      it "updates the product" do
        put :update, params: { id: product.id, product: { name: "Updated Product" } }
        product.reload
        expect(product.name).to eq("Updated Product")
        expect(response).to have_http_status(:ok)
      end
    end

    context "with regular user authentication" do
      before do
        @user = FactoryBot.create(:user)
        sign_in @user
      end

      it "returns unauthorized" do
        put :update, params: { id: product.id, product: { name: "Updated Product" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without authentication" do
      it "returns unauthorized" do
        put :update, params: { id: product.id, product: { name: "Updated Product" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE #destroy" do
    context "with admin authentication" do
      before do
        @admin_user = FactoryBot.create(:user)
        Admin.create(user: @admin_user)
        sign_in @admin_user
      end

      it "destroys the product" do
        product_to_delete = FactoryBot.create(:product)
        expect {
          delete :destroy, params: { id: product_to_delete.id }
        }.to change(Product, :count).by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end

    context "with regular user authentication" do
      before do
        @user = FactoryBot.create(:user)
        sign_in @user
      end

      it "returns unauthorized" do
        delete :destroy, params: { id: product.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "without authentication" do
      it "returns unauthorized" do
        delete :destroy, params: { id: product.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
