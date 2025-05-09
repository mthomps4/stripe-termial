class Product < ApplicationRecord

  def self.ransackable_attributes(auth_object = nil)
    ["id", "name", "price", "updated_at", "created_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
