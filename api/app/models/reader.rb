class Reader < ApplicationRecord
  belongs_to :location

  # Registration Flow
  # CLIENT UX: Select Location (Or hardcode to HQ)
  # CLIENT UX: Type in Label
  # CLIENT UX: Register Reader via Bluetooth (Stripe Terminal SDK)
  # CLIENT UX: Confirm Reader Registration
  # CLIENT HOOK: Send info to server
  # SERVER: Create Reader tied to Location for Admin Dashboard
  # ADMIN UX: Can see/manage Readers from Admin Dashboard
  # Connected Account User: Can see their readers in their Stripe Dashboard
end
