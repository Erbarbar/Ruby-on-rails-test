class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.float :price
      t.date :day
      t.string :image_url

      t.timestamps null: false
    end
  end
end
