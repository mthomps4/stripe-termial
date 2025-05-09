class ApplicationController < ActionController::API
  include Authentication
  include ActionController::MimeResponds

  before_action :authenticate

  # Handle exceptions for API responses
  rescue_from StandardError do |exception|
    render json: { error: exception.message }, status: :internal_server_error
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { error: exception.message }, status: :not_found
  end

  private

  def current_user
    @current_user
  end

  def current_user=(user)
    @current_user = user
  end
end
