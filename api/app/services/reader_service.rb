class ReaderService
  def self.update_reader(reader)
    # Update reader details in Stripe
    Stripe::Terminal::Reader.update(
      reader.stripe_id,
      {
        label: reader.label,
        location: reader.location.stripe_id
      }
    )
  rescue Stripe::StripeError => e
    Rails.logger.error "Failed to update reader in Stripe: #{e.message}"
    raise e
  end
end
