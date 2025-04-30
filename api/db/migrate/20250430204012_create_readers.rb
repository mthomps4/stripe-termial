class CreateReaders < ActiveRecord::Migration[8.0]
  def change
    create_table :readers do |t|
      t.references :location, null: false, foreign_key: true
      t.string :stripe_id
      t.string :label
      t.string :serial_number
      t.string :reader_type

      t.timestamps
    end
    add_index :readers, :stripe_id, unique: true
    add_index :readers, :label, unique: true
    add_index :readers, :serial_number, unique: true
  end
end
