class Stripe::TerminalController < ::StripeController
  # POST /api/stripe/terminal/connection_token
  def connection_token
    # Create a new connection token from Stripe
    token = ::Stripe::Terminal::ConnectionToken.create

    # Return only the secret to the client
    render json: { secret: token.secret }
  rescue ::Stripe::StripeError => e
    handle_stripe_error(e)
  end
end
