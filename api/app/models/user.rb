class User < ApplicationRecord
  has_secure_password

  has_one :admin, dependent: :destroy
  has_one :merchant, dependent: :destroy

  accepts_nested_attributes_for :admin, :merchant

  # Add basic validations that were previously handled by Devise
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: /\A[^@\s]+@[^@\s]+\z/ }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  # Rails 8 built-in authentication helper - no need for custom authenticate method
  # This replaces the has_secure_password authenticate method with Rails 8's improved version

  def is_admin?
    admin.present?
  end

  def is_merchant?
    merchant.present?
  end

  def first_name
    return admin.first_name if is_admin?
    return merchant.first_name if is_merchant?

    nil
  end

  def last_name
    return admin.last_name if is_admin?
    return merchant.last_name if is_merchant?

    nil
  end
end
