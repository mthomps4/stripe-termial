# Automatically reverse transfers with Stripe Refunds

## Overview

Stripe has many ways to manage funds when processing payments. One of which is called a [direct charge](https://docs.stripe.com/connect/direct-charges). The Platform is responsible for refunds in this case, however, funds can be automatically transferred from the connected accounts back to the platform with one single parameter. i.e. `reverse_transfer: true`

I keep having to remind myself of this field -- so here's a blog snippet.

## Create a Payment Intent that will transfer funds to a connected account (Direct Charge/Transfer flow)

```ruby
payment_intent = Stripe::PaymentIntent.create(
  amount: 2000,
  currency: 'usd',
  capture_method: 'manual', # Requires manual capture of payment
  on_behalf_of: {{CONNECT_ACCOUNT_ID}},
  transfer_data: {
    destination: {{CONNECT_ACCOUNT_ID}} # Direct payment to merchant
  },
  payment_method_types: ['card_present'], # For card reader payments
  ...
)
```

## Reversing the transfer automatically at a later time

```ruby
refund = Stripe::Refund.create(
  payment_intent: payment_intent.id,
  amount: 2000, # Full refund amount
  reverse_transfer: true # Automatically pull back transferred funds
)
```

By default, when you refund a payment that has already been transferred to a connected account, you'll need to handle recovering those funds separately. However, setting `reverse_transfer: true` automatically pulls back the transferred funds from the connected account during the refund process. While the Platform account is still technically responsible, it can be made known with Connected Accounts that the funds will be pulled from their account to offset. With this flag, there's no need to run additional steps to manage funds.
