Rails.application.routes.draw do
  # Configure Devise routes with proper scope and controllers
  devise_for :users,
    path: "api",
    path_names: {
      sign_in: "login",
      sign_out: "logout",
      registration: "signup"
    },
    controllers: {
      sessions: "sessions",
      registrations: "registrations"
    },
    defaults: { format: :json }

  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes
  scope :api do
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
