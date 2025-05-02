# Stripe S700 Reader Setup

POC repo of examples needed to setup an Stripe Card Reader
In my use case the S700

<https://docs.stripe.com/terminal/designing-integration?integration-country=US&platform=web>

- Rails API
- NextJS Web
- Expo (Future RN Mobile)

## Rough Outline

Example Business/Application:

- Barber Shop (Platform Account)
  - Sets Products and Prices (NON STRIPE)
- Barbers (Connected Accounts)
  - Each have their own Card Reader
  - Can build a cart
  - Can take Payments via Reader / Tap to Pay
    - Platform: Direct Charge and Transfer w/ Fee
- Customers: Make Payments w/ Card

**GOAL:**
"What if ___ Fails?!"
Document all the edge cases with Stripe Card Readers and Terminal Setup.
... Both Expo and Web. Stand alone Server for the full Enterprise Example.

**Stretch Goal**
Full E2E example w/ Connected Accounts

### Stripe Terminal Integration Outline

### Initial Location Setup

- MOBILE: Displays interface for creating/selecting a location
- MOBILE: Makes API call to /api/locations with location details
- API: Creates location in database and registers with Stripe via stripe.terminal.locations.create
- API: Returns location object with ID to client
- MOBILE: Stores location ID for future terminal operations

### Reader Registration

- MOBILE: Displays interface for registering new readers with the location
- MOBILE: Makes API call to /api/terminal/readers/register with reader registration code and location ID
- API: Registers reader with Stripe via stripe.terminal.readers.create with location_id parameter
- API: Returns reader details to client
- MOBILE: Displays confirmation of reader registration
- Stripe: Associates reader with the specified location
- MOBILE: Can optionally set reader display name via call to /api/terminal/readers/:id
- API: Updates reader label via stripe.terminal.readers.update

### Terminal & Reader Management

- API: Create endpoint /api/terminal/connection_token to generate connection tokens
- MOBILE: Initializes Stripe Terminal SDK with connection token
- MOBILE: Makes API call to /api/terminal/readers to list available readers
- API: Queries Stripe via stripe.terminal.readers.list with location filter
- API: Returns list of available readers to client
- MOBILE: Displays reader selection interface
- MOBILE: Connects to selected reader using Terminal SDK

### Payment Flow

- MOBILE: Displays product/cart interface with checkout option
- MOBILE: Creates payment intent via call to /api/payment_intents with amount and currency
- API: Creates payment intent via stripe.paymentIntents.create with appropriate parameters
- API: Returns payment intent details and client secret to client
- MOBILE: Uses Terminal SDK to collect payment method with terminal.collectPaymentMethod()
- MOBILE: Processes payment with terminal.processPayment() using client secret
- MOBILE: Makes API call to /api/payment_intents/:id/capture if payment needs separate capture
- API: Captures payment intent if needed
- API: Returns final payment status to client
- MOBILE: Shows payment confirmation or error message

### Reader Configuration

- API: Create endpoint /api/terminal/reader_config for reader configuration
- MOBILE: Makes API call to get/update reader configuration
- API: Gets/updates reader configuration via Stripe API
- API: Returns configuration details to client
- MOBILE: Displays configuration options to merchant

### Transaction Management

- MOBILE: Makes API call to /api/transactions to list past transactions
- API: Queries database for transactions, possibly also retrieving data from Stripe
- API: Returns transaction history to client
- MOBILE: Displays transaction history with filters and search
- MOBILE: Offers refund option for eligible transactions
- MOBILE: Makes API call to /api/refunds with payment intent ID and amount
- API: Creates refund via stripe.refunds.create
- API: Returns refund status to client

### Error Handling & Logging

- API: Implement error handling middleware for Stripe API errors
- MOBILE: Implement error handling for Terminal SDK errors
- MOBILE: Log events to /api/logs for debugging
- API: Store logs and reader events in database
- API: Create webhook handler /api/webhooks/stripe for Stripe events
- Stripe: Sends webhook events for payment status updates, reader status changes, etc.

### Offline Mode Support

- MOBILE: Implement offline mode detection
- MOBILE: Store transactions locally when offline
- MOBILE: Sync with API when connection is restored
- API: Handle batched transaction processing

### Security Considerations

- API: Implement authentication for all endpoints
- API: Store Stripe API keys securely using Rails credentials
- MOBILE: Never expose API keys in frontend code
- API: Validate webhook signatures from Stripe
- API: Implement proper CORS settings

See Readmes for a better breakdown:

- [API README](./api/README.md)
- [WEB README](./web/README.md)
- [MOBILE README](./mobile/README.md)
