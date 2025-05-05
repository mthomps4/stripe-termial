class CreateMerchants < ActiveRecord::Migration[8.0]
  def change
    create_table :merchants do |t|
      t.string :first_name
      t.string :last_name
      t.string :stripe_account_id
      t.string :stripe_account_status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
