json.token token
json.user do
  json.partial! 'api/users/user', user: user
end

