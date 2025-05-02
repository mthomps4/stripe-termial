class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  respond_to :json

  before_action :authenticate_user!

  # Handle exceptions for API responses
  rescue_from StandardError do |exception|
    render json: { error: exception.message }, status: :internal_server_error
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { error: exception.message }, status: :not_found
  end

  private

  def authenticate_user!
    return if current_user

    render json: {
      error: "You need to sign in or sign up before continuing."
    }, status: :unauthorized
  end
end
