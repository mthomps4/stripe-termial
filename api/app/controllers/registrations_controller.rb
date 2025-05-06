class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?

    if resource.persisted?
      if resource.active_for_authentication?
        # Don't use sign_in as it tries to use sessions
        # Instead, just generate the JWT directly
        token = generate_jwt_for(resource)

        # Set the JWT token in response headers
        response.headers["Authorization"] = "Bearer #{token}"

        render "api/users/session", locals: { token: token, user: resource }, status: :ok
      else
        # Handle inactive account (e.g., unconfirmed email)
        render json: {
          status: { code: 200, message: "Signed up successfully but account is inactive." }
        }, status: :ok
      end
    else
      # Clean up registration data and return validation errors
      clean_up_passwords resource
      set_minimum_password_length

      render json: {
        status: {
          code: 422,
          message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}"
        }
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, merchant_attributes: [ :first_name, :last_name ])
  end

  # Helper method to generate JWT token
  def generate_jwt_for(user)
    payload = {
      sub: user.id.to_s,
      jti: user.jti,
      scp: "user",
      exp: 24.hours.from_now.to_i,
      iat: Time.current.to_i
    }

    secret = Rails.application.credentials.devise_jwt_secret_key ||
             ENV.fetch("DEVISE_JWT_SECRET_KEY", "test_key_for_development")

    JWT.encode(payload, secret, "HS256")
  end
end
