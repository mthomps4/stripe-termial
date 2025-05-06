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
    admin.first_name || merchant.first_name
  end

  def last_name
    admin.last_name || merchant.last_name
  end
end
