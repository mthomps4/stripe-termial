class CreateAdmins < ActiveRecord::Migration[8.0]
  def change
    create_table :admins do |t|
      t.string :first_name
      t.string :last_name
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
