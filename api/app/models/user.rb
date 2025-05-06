class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Configure devise modules for JWT API - combine all needed modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_one :admin, dependent: :destroy
  has_one :merchant, dependent: :destroy

  accepts_nested_attributes_for :admin, :merchant

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
