class AuthenticationController < ApplicationController
  skip_before_action :authenticate, only: [ :login, :signup ]

  def login
    if user = User.authenticate_by(email: params[:user][:email], password: params[:user][:password])
      token = JwtService.encode(user_id: user.id)
      render "api/users/session", locals: { token: token, user: user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def signup
    user = User.new(user_params)

    if user.save
      token = JwtService.encode(user_id: user.id)
      render "api/users/session", locals: { token: token, user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, merchant_attributes: [ :first_name, :last_name ])
  end
end
