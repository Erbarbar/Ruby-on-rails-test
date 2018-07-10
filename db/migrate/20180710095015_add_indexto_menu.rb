class AddIndextoMenu < ActiveRecord::Migration
  def change
		add_index :Menus, [:name, :price, :day], unique: true
  end
end
