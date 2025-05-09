# This module manages authentication against the API using JSON Web Tokens.
module Authentication
  extend ActiveSupport::Concern
  include ActionController::HttpAuthentication::Token::ControllerMethods

  attr_accessor :current_user

  private

  def authenticate
    authenticate_or_request_with_http_token do |token, _options|
      self.current_user = fetch_user_from_jwt(token)
    end
  end

  def authenticate_admin
    authenticate_or_request_with_http_token do |token, _options|
      self.current_user = fetch_user_from_jwt(token)
      unless current_user&.is_admin?
        render json: { error: "You need to be an admin to continue." }, status: :unauthorized
      end
    end
  end
  # Override the default behavior to handle token authentication failure and send JSON response instead of HTML.
  # See:
  # https://api.rubyonrails.org/v7.1.3/classes/ActionController/HttpAuthentication/Token/ControllerMethods.html#method-i-authenticate_or_request_with_http_token
  # https://api.rubyonrails.org/v7.1.3/classes/ActionController/HttpAuthentication/Token/ControllerMethods.html#method-i-request_http_token_authentication
  # https://api.rubyonrails.org/v7.1.3/classes/ActionController/HttpAuthentication/Token.html#method-i-authentication_request
  def request_http_token_authentication(_realm = "Application", message = nil)
    message ||= "HTTP Token: Access denied."
    render json: { error: message }, status: :unauthorized
  end

  def fetch_user_from_jwt(token)
    user_data = decode_jwt(token)
    return if user_data.blank?

    User.find_by(id: user_data[0]["user_id"])
  end

  def decode_jwt(token)
    JwtService.decode(token)
  rescue JWT::DecodeError
    nil
  end
end
