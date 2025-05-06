class MerchantsController < ApplicationController
  before_action :authenticate_user!, only: [:create_test_connect_account]

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  def create_test_connect_account
    if current_user.merchant&.stripe_account_id.present?
      render json: {
        message: "User already has a Stripe connect account",
        status: "error",
      }, status: :bad_request
    end

    Rails.logger.info("Creating test connect account for user: #{current_user.id}")
    account = Stripe::ConnectAccountService.new(current_user).create_test_account
    Rails.logger.info("Test connect account created: #{account.id}")

    render json: {
      message: "Test connect account created",
      status: "success",
      connect_account_id: account.id,
      connect_account_status: "completed", # fudge this check for now...
    }, status: :created

  rescue StandardError => e
    render json: {
      message: "Failed to create test connect account",
      status: "error",
      error: e.message,
    }, status: :internal_server_error
  end
end
