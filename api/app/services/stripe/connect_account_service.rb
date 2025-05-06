class Stripe::ConnectAccountService
  def initialize(user)
    @user = user
  end

  def create_test_account
    return if @user.merchant&.stripe_account_id.present?

    account = Stripe::Account.create({
      type: 'custom',
      country: 'US',
      email: @user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
      business_profile: {
        mcc: '7230',
        url: 'https://accessible.stripe.com',
        product_description: 'Barber services'
      },
      individual: {
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email,
        phone: '0000000000',
        dob: {
          day: 1,
          month: 1,
          year: 1901
        },
        address: {
          line1: 'address_full_match',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94111',
          country: 'US'
        },
        id_number: '000000000',
        ssn_last_4: '0000'
      },
      tos_acceptance: {
        date: Time.now.to_i,
        ip: '127.0.0.1'
      },
      external_account: {
        object: 'bank_account',
        country: 'US',
        currency: 'usd',
        routing_number: '110000000',
        account_number: '000123456789'
      }
    })

    # complete_status = account.charges_enabled && account.payouts_enabled

    @user.merchant.update_columns(
      stripe_account_id: account.id,
      stripe_account_status: "completed" # fudge this check for now...
    )

    account
  rescue Stripe::StripeError => e
    raise e
  end
end
