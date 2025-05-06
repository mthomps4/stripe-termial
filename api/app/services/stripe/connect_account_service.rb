class Stripe::ConnectAccountService
  def initialize(user)
    @user = user
  end

  def create_test_account
    return if @user.stripe_connect_account_id.present?

    account = Stripe::Account.create({
      type: 'custom',
      country: 'US',
      email: @user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
        payouts: { requested: true },
      },
      business_type: 'individual',
      business_profile: {
        mcc: '7230', # Barber and Beauty Shops
        url: 'https://sweet-treats.example.com',
        product_description: 'Barber services'
      },
      individual: {
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email,
        phone: '+1234567890',
        dob: {
          day: 1,
          month: 1,
          year: 1990
        },
        address: {
          line1: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94111',
          country: 'US'
        },
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

    @user.update_columns(
      stripe_connect_account_id: account.id,
      stripe_connect_account_status: account.payouts_enabled ? 'active' : 'pending'
    )

    account
  end
end
