module JwtHelper
  def generate_jwt_token_for(user)
    # Create a properly formatted JWT token with the required claims
    payload = {
      sub: user.id.to_s,
      jti: user.jti,
      scp: 'user',  # Add scope claim
      exp: 1.day.from_now.to_i,
      iat: Time.current.to_i
    }

    JWT.encode(
      payload,
      ENV['DEVISE_JWT_SECRET_KEY'] || 'test_secret_key',
      'HS256'
    )
  end

  # Helper to set auth headers in controller tests
  def auth_headers_for(user)
    token = generate_jwt_token_for(user)
    { 'Authorization' => "Bearer #{token}" }
  end
end

RSpec.configure do |config|
  config.include JwtHelper
end
