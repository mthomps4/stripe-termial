# Stripe M2 Reader Setup

![Sweet Cuts Logo](./sweet_cuts.png)

POC repo of examples needed to setup an Stripe Card Reader
In my use we are using the BLUETOOTH M2 READER.

- API: Rails (JSON API)
- WEB: NextJS (Admin, Connect Account Onboarding, Dashboards)
  - Admin User: Manage the world, Products, Prices, Barbers, Readers etc.
  - Connect Account User: Onboarding and future Transaction Dashboards
- MOBILE: Expo (Payment App, M2 Usage)

<https://docs.stripe.com/terminal/designing-integration?integration-country=US&platform=web>

## Learning Goals

"What if ___ Fails with the M2 Reader?!"
Document all the edge cases with Stripe Card Readers and Terminal Setup.
Stand alone Server for the fuller Enterprise Example.
Full E2E example w/ Connected Accounts and fund flows.

## Example Business

- Barber Shop (Admin) (Platform Account)
  - Sets Products and Prices (NON STRIPE)
- Barbers (Connected Accounts)
  - Each will have their own Card Reader tied to HQ
  - Can build a cart
  - Can take Payments via Reader / Tap to Pay
    - Platform: Direct Charge and Transfer w/ Fee
- "Anonymous" Customers: Make Payments w/ Card

## Stripe Terminal Integration Outline

### Initial Location Setup

- ADMIN WEB: Admin can CRUD locations through the web/api
  - API: API will CRUD with Stripe

### Reader Registration

- MOBILE: Displays interface for registering a new reader with the Location and Label
- MOBILE/STRIPE SDK: Bluetooth SDK is used to register the device with Stripe under the Platform Account.
- MOBILE: Makes API call to POST /api/terminal/readers with successful registration info to update the DB for observability
- API: Saves Reader to the DB for future Admin observability
- MOBILE: Displays confirmation of reader registration

### Reader Management

- Web/Mobile/API: Can update reader label/location in Stripe and local DB

### Products

For this example app - Products and Prices are NOT in Stripe.
Payment Intents will be a set `amount`.

Admin/API CRUD
Mobile - List Products for Cart Management

### Terminal & Reader Management

- API: Create endpoint /api/terminal/connection_token to generate connection tokens
- MOBILE: Ensure M2 Reader is synced
- MOBILE: Initializes Stripe Terminal SDK with connection_token

### Payment Flow

<https://docs.stripe.com/terminal/features/connect#direct>

- MOBILE: Displays product/cart interface with checkout option
- MOBILE: Creates payment intent via call to /api/v1/payment_intents with amount and currency
- API: Creates payment intent via stripe.paymentIntents.create with appropriate parameters
- API: Returns payment intent details and client secret to client
- MOBILE: Uses Terminal SDK to collect payment method with terminal.collectPaymentMethod()
- MOBILE: Processes payment with terminal.processPayment() using client secret
- MOBILE: Makes API call to /api/v1/payment_intents/:id/capture if payment needs separate capture
- API: Captures payment intent if needed
- API: Returns final payment status to client
- MOBILE: Shows payment confirmation or error message

### Transactional Dashboards

- Stripe Embedded Components

See Readmes for a better breakdown:

- [API README](./api/README.md)
- [WEB README](./web/README.md)
- [MOBILE README](./mobile/README.md)
