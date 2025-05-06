json.id user.id
json.email user.email

if user.is_merchant?
  json.partial! 'api/merchants/merchant', merchant: user.merchant
end

if user.is_admin?
  json.partial! 'api/admins/admin', admin: user.admin
end
