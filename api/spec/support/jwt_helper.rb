# This file should be deleted or updated to your new authentication mechanism

module JwtHelper
  def auth_headers_for(user)
    token = JwtService.encode(user_id: user.id)
    { 'Authorization' => "Bearer #{token}" }
  end
  
  def sign_in_user(user)
    request.headers['Authorization'] = "Bearer #{JwtService.encode(user_id: user.id)}"
  end
end

RSpec.configure do |config|
  config.include JwtHelper
end
