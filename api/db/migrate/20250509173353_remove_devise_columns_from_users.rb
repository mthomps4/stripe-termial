class RemoveDeviseColumnsFromUsers < ActiveRecord::Migration[8.0]
  def change
    # Remove Devise-specific columns
    remove_column :users, :encrypted_password, :string
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime
    remove_column :users, :remember_created_at, :datetime

    # Keep the email column, but add an index if missing
    add_index :users, :email, unique: true unless index_exists?(:users, :email)

    # Keep jti column for now as it might be used by your new auth system
  end
end
