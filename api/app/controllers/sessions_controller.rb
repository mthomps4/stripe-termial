class SessionsController < Devise::SessionsController
  respond_to :json
  # Not using full Rails ERB / Web here...
  # before_action :authenticate_user!, only: [ :destroy ]

  # Override the create method to handle login requests
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)

    # Get the JWT token and set it in the response headers
    token = request.env["warden-jwt_auth.token"]
    response.headers["Authorization"] = "Bearer #{token}" if token.present?

    render "api/users/session", locals: { user: resource, token: token }, status: :ok
  end

  # Handle logout requests
  def destroy
    # JWT tokens cannot be destroyed server-side with pure JWT
    # We would need to implement a blacklist or use JTI strategy
    # Here we simply return success
    #
    # Wiping Local Storage on FE logout
    render json: {
      status: 200,
      message: "Logged out successfully."
    }, status: :ok
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted? && current_user
      token = request.env["warden-jwt_auth.token"]
      render "api/users/session", locals: { user: current_user, token: token }, status: :ok
    else
      render json: {
        error: "Invalid Email or password."
      }, status: :unauthorized
    end
  end
end
