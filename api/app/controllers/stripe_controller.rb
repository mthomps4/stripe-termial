class StripeController < ApplicationController
  before_action :authenticate

  protected

  def handle_stripe_error(error)
    render json: { error: error.message }, status: :bad_request
  end
end
