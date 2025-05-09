class AuthenticationStuff < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :password_digest, :string unless column_exists?(:users, :password_digest)
    remove_column :users, :jti, :string if column_exists?(:users, :jti)
  end
end
