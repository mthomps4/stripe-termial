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

## OpenAPI / Swagger

- See Swagger/Open API docs by running the following:
  - `todo`

### API Components (Rails API)

- API: Create endpoint /api/locations for creating/listing locations
- API: Create endpoint /api/locations/:id for getting/updating/deleting locations

- API: Create endpoint /api/terminal/connection_token for generating secure connection tokens
- API: Create endpoint /api/terminal/readers/register for registering new readers with location
- API: Create endpoint /api/terminal/readers for listing readers by location
- API: Create endpoint /api/terminal/readers/:id for getting/updating reader details

- API: Create endpoint /api/payment_intents for creating payment intents
- API: Create endpoint /api/payment_intents/:id for retrieving payment intent status
- API: Create endpoint /api/payment_intents/:id/capture for capturing uncaptured payments

- API: Create endpoint /api/refunds for processing refunds
- API: Create endpoint /api/transactions for listing transaction history
- API: Create endpoint /api/webhooks/stripe for handling Stripe webhook events
- API: Create endpoint /api/logs for storing client-side logs and events

### Stripe Dashboard Setup

- STRIPE: Enable Stripe Terminal in dashboard
- STRIPE: Configure webhook endpoints for Terminal events
- STRIPE: Set up location capabilities
- STRIPE: Configure reader limits and settings
- STRIPE: Create test mode Terminal readers (for development)
- STRIPE: Configure reporting and notification preferences
- STRIPE: Set up team member access and permissions
- STRIPE: Configure accepted payment methods
- STRIPE: Set up tax and currency settings
