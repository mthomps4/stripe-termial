class UserSerializer
  include JSONAPI::Serializer
  
  attributes :id, :email, :created_at
  
  # Don't include sensitive data like password
  # You can add other user attributes as needed
end 