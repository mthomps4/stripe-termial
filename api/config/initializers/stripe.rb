if ENV['STRIPE_SECRET_KEY']
  Stripe.api_key = ENV['STRIPE_SECRET_KEY']
else
  raise "STRIPE_SECRET_KEY is not set"
end
