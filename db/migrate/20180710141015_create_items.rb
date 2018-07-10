class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :food_type
      t.string :name
      t.float :price
      t.text :description

      t.timestamps null: false
    end
  end
end
