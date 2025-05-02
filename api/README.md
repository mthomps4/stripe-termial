# Stripe Terminal API

API Only to showcase full E2E concepts

## Getting Started

- copy `.env.example` to `.env`
  - INCLUDE YOUR STRIPE KEY
- run `./bin/setup`
- `./bin/dev`

## Postman

Download the full collection [HERE](docs/postman).
If new API Endpoints are added please re-export the collection here.
[docs/postman](./docs/postman/)

## Swagger/Open API Docs

To update the API documentation when making controller changes:

1. Add/update RSpec request specs with new examples in `spec/requests/api` directory
2. Run the test suite: `bundle exec rspec`
3. Generate updated Swagger docs: `bundle exec rake rswag:specs:swaggerize`
4. View docs locally at: `http://localhost:4000/api-docs`

The OpenAPI/Swagger documentation is automatically generated from the RSpec tests.

### API Components (Rails API)

- API: Create endpoint /api/locations for creating/listing locations
- API: Create endpoint /api/locations/:id for getting/updating/deleting locations

- API: Create endpoint /api/terminal/readers/register for registering new readers with location
- API: Create endpoint /api/terminal/readers for listing readers by location
- API: Create endpoint /api/terminal/readers/:id for getting/updating reader details
- API: Create endpoint /api/terminal/connection_token for generating secure connection tokens

- API: Create endpoint /api/payment_intents for creating payment intents
- API: Create endpoint /api/payment_intents/:id for retrieving payment intent status
- API: Create endpoint /api/payment_intents/:id/capture for capturing uncaptured payments

- API: Create endpoint /api/transactions for listing transaction history
- API: Create endpoint /api/webhooks/stripe for handling Stripe webhook events

### Stripe Dashboard Setup

- STRIPE: Enable Stripe Terminal in dashboard
- STRIPE: Configure webhook endpoints for Terminal events
- STRIPE: Set up location capabilities
- STRIPE: Configure reader limits and settings
- STRIPE: Create test mode Terminal readers (for development)
- STRIPE: Configure accepted payment methods
- STRIPE: Set up tax and currency settings
