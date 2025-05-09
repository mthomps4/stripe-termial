class AuthenticationController < ApplicationController
  skip_before_action :authenticate, only: [ :login, :register ]

  def login
    if @user = User.authenticate_by(email: params[:user][:email], password: params[:user][:password])
      token = JwtService.encode(user_id: @user.id)
      render json: { token: token, user: user_data(@user) }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def register
    @user = User.new(user_params)

    if @user.save
      token = JwtService.encode(user_id: @user.id)
      render json: { token: token, user: user_data(@user) }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, merchant_attributes: [ :first_name, :last_name ])
  end

  def user_data(user)
    {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_admin: user.is_admin?
    }
  end
end
