json.id user.id
json.email user.email

if user.is_merchant?
  json.partial! 'api/v1/merchants/merchant', merchant: user.merchant
end

if user.is_admin?
  json.partial! 'api/v1/admins/admin', admin: user.admin
end
