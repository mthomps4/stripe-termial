Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  scope :api do
    # Authentication routes
    post "login", to: "authentication#login"
    post "signup", to: "authentication#signup"

    resources :locations
    resources :readers
    resources :products
    resources :merchants, except: [ :create ] do
      post :create_test_connect_account, on: :collection
    end

    # Stripe endpoints
    namespace :stripe do
      namespace :terminal do
        post "connection_token"
      end
    end
  end
end
